package com.DeveloperDiary.controller;

import com.DeveloperDiary.dto.AuthResponse;
import com.DeveloperDiary.dto.LoginRequest;
import com.DeveloperDiary.dto.RegisterRequest;
import com.DeveloperDiary.model.User;
import com.DeveloperDiary.model.VerificationToken;
import com.DeveloperDiary.repo.UserRepo;
import com.DeveloperDiary.repo.VerificationTokenRepo;
import com.DeveloperDiary.security.CustomUserDetailsService;
import com.DeveloperDiary.security.JwtUtil;
import com.DeveloperDiary.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private VerificationTokenRepo verificationTokenRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (request.getUsername() == null || request.getUsername().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username, email and password are all required"));
        }

        if (userRepo.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username is already taken"));
        }

        if (userRepo.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email is already registered"));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setEnabled(false);
        userRepo.save(user);

        issueAndSendVerificationToken(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Account created! Please check your email to verify your account before logging in."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Please verify your email before logging in.", "code", "EMAIL_NOT_VERIFIED"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        AuthResponse response = new AuthResponse(token, user.getUsername(), user.getEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam("token") String token) {
        VerificationToken verificationToken = verificationTokenRepo.findByToken(token).orElse(null);

        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid or already-used verification link."));
        }

        User user = verificationToken.getUser();

        if (user.isEnabled()) {
            return ResponseEntity.ok(Map.of("message", "This account is already verified. You can log in."));
        }

        if (verificationToken.isExpired()) {
            return ResponseEntity.status(HttpStatus.GONE)
                    .body(Map.of("message", "This verification link has expired. Please request a new one.", "code", "TOKEN_EXPIRED"));
        }

        user.setEnabled(true);
        userRepo.save(user);
        verificationTokenRepo.delete(verificationToken);

        return ResponseEntity.ok(Map.of("message", "Email verified! You can now log in."));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email is required"));
        }

        User user = userRepo.findByEmail(email).orElse(null);

        // Don't reveal whether the email exists in the system.
        if (user == null || user.isEnabled()) {
            return ResponseEntity.ok(Map.of("message", "If that account needs verifying, a new email is on its way."));
        }

        verificationTokenRepo.findByUser(user).ifPresent(verificationTokenRepo::delete);
        issueAndSendVerificationToken(user);

        return ResponseEntity.ok(Map.of("message", "If that account needs verifying, a new email is on its way."));
    }

    private void issueAndSendVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        verificationTokenRepo.save(new VerificationToken(token, user));
        emailService.sendVerificationEmail(user.getEmail(), user.getUsername(), token);
    }
}
