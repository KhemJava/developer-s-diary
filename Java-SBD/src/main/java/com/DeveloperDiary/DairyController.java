package com.DeveloperDiary;

import com.DeveloperDiary.model.DairyPost;
import com.DeveloperDiary.service.DairyService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("dairyPosts")  //Get fetch Mapping
    public List<DairyPost> getAllPosts(){

        return service.getAllPosts();
    }

    @GetMapping("dairyPost/{dairyId}") // Get single data fetch by dairyId Mapping
    public DairyPost getSinglePost(@PathVariable("dairyId") int dairyId){
        return service.getPost(dairyId);
    }

    @GetMapping("dairyPosts/keyword/{keyword}")  //Get search mapping using keyword
    public List<DairyPost> searchByKeyword(@PathVariable("keyword") String keyword){
        return service.searchById(keyword);
    }

   @PostMapping("addPost") //Post add to Database Mapping
    public DairyPost addPost(@RequestBody DairyPost dairyPost){
        service.addPost(dairyPost);
        return service.getPost(dairyPost.getDairyId());//just to fetch what is updated on the Database
    }

    @PutMapping("dairyPost")  //Put update Database Mapping - just updates the existing Diary Post
    public DairyPost updatePost(@RequestBody DairyPost dairyPost){
        service.updatePost(dairyPost);
        return service.getPost(dairyPost.getDairyId());
    }

    @DeleteMapping("dairyPost/{dairyId}")  //Delete the Post from Database Mapping
    public String deletePost(@PathVariable int dairyId){
        service.deletePost(dairyId);
        return"Deleted";
    }

    @GetMapping("load")
    public String loadData(){
        service.load();
        return "Successful Loading Data in Database";
    }


}
