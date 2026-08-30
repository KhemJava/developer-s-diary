package com.DeveloperDiary;

import com.DeveloperDiary.model.DairyPost;
import com.DeveloperDiary.service.DairyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DairyController {

    @Autowired
    private DairyService service;

    @GetMapping("home")
    public String home(){
        return "home";
    }

    @GetMapping("dairyPosts")  //Get fetch Mapping - only the caller's own posts
    public List<DairyPost> getAllPosts(Authentication authentication){
        return service.getAllPosts(authentication.getName());
    }

    @GetMapping("dairyPost/{dairyId}") // Get single data fetch by dairyId Mapping - owner only
    public ResponseEntity<DairyPost> getSinglePost(@PathVariable("dairyId") Long dairyId, Authentication authentication){
        return service.getPost(dairyId, authentication.getName())
                .map(ResponseEntity::ok)
                // Return 404 even if the ID exists for another user, so we never
                // reveal that someone else's entry exists.
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("dairyPosts/keyword/{keyword}")  //Get search mapping using keyword - owner only
    public List<DairyPost> searchByKeyword(@PathVariable("keyword") String keyword, Authentication authentication){
        return service.searchByKeyword(keyword, authentication.getName());
    }

   @PostMapping("addPost") //Post add to Database Mapping - always saved under the caller's account
    public DairyPost addPost(@RequestBody DairyPost dairyPost, Authentication authentication){
        return service.addPost(dairyPost, authentication.getName());
    }

    @PutMapping("dairyPost")  //Put update Database Mapping - only if the caller owns this entry
    public ResponseEntity<DairyPost> updatePost(@RequestBody DairyPost dairyPost, Authentication authentication){
        return service.updatePost(dairyPost, authentication.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("dairyPost/{dairyId}")  //Delete the Post from Database Mapping - only if the caller owns this entry
    public ResponseEntity<String> deletePost(@PathVariable Long dairyId, Authentication authentication){
        boolean deleted = service.deletePost(dairyId, authentication.getName());
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
        }
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("load")
    public String loadData(Authentication authentication){
        service.load(authentication.getName());
        return "Successful Loading Data in Database";
    }

}
