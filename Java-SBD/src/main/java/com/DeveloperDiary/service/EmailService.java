package com.DeveloperDiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromAddress;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendVerificationEmail(String toEmail, String username, String token) {
        String link = frontendUrl + "/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject("Verify your Developer's Diary account");
        message.setText(
                "Hi " + username + ",\n\n" +
                "Welcome to Developer's Diary! Please confirm your email address by clicking the link below:\n\n" +
                link + "\n\n" +
                "This link expires in " + com.DeveloperDiary.model.VerificationToken.EXPIRATION_HOURS + " hours.\n\n" +
                "If you didn't create this account, you can safely ignore this email.\n\n" +
                "Happy journaling!\nThe Developer's Diary Team"
        );

        mailSender.send(message);
    }
}
