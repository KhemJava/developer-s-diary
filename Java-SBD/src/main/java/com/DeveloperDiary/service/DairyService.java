package com.DeveloperDiary.service;

import com.DeveloperDiary.model.DairyPost;
import com.DeveloperDiary.repo.DairyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DairyService {


    private final DairyRepo repo;

    @Autowired
    public DairyService(DairyRepo repo) {
        this.repo = repo;
    }

    public List<DairyPost> getAllPosts() {

        return repo.findAll();
    }

    public void addPost(DairyPost post) {

        repo.save(post);
    }

    public DairyPost getPost(int dairyId) {
        return repo.findById(dairyId). orElse(new DairyPost());

    }

    public void updatePost(DairyPost dairyPost) {
        repo.save(dairyPost);
    }

    public void deletePost(int dairyId) {
        repo.deleteById(dairyId);
    }

    public List<DairyPost> searchById(String keyword){
        return repo.findByDairyFacedContainingOrDairyLearnedContainingOrDairyImprovementsContainingOrDairyTomorrowPlanContainingOrDairyDescriptionContaining
                (keyword, keyword, keyword, keyword, keyword);
    }
      //just to load some data on database to have some data
    public void load() {
        List<DairyPost> posts = new ArrayList<>(Arrays.asList(
                new DairyPost(1, "Slow Internet", "Faced frequent disconnections", "Restarted router and limited background apps", "Check for better ISP plans", "Productivity dropped due to slow network"),

                new DairyPost(2, "Spring Boot Error", "App crashed on start", "Resolved missing dependency issue", "Practice exception handling more", "Learned to debug logs effectively"),

                new DairyPost(3, "Poor Time Management", "Wasted time scrolling social media", "Used Pomodoro technique to regain focus", "Stick to time blocks strictly", "Realized how distractions ruin flow"),

                new DairyPost(4, "UI Design Confusion", "Layout looked messy", "Refactored with Material UI grid system", "Study modern UI patterns", "Users gave better feedback after changes"),

                new DairyPost(5, "Database Connectivity", "JPA wasn’t saving data", "Fixed application.properties configs", "Revise DB connection setup", "Learned about JDBC vs JPA details"),

                new DairyPost(6, "Team Miscommunication", "Missed feature requirement", "Scheduled a sync-up call", "Always confirm tasks on Slack", "Better clarity among team after meeting"),

                new DairyPost(7, "Low Motivation", "Didn't feel like working", "Watched tech talk and took a break", "Include short breaks in routine", "Breaks helped regain energy and focus")

                ));
        repo.saveAll(posts);
    }

}
