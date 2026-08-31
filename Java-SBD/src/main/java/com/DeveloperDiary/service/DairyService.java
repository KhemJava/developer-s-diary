package com.DeveloperDiary.service;

import com.DeveloperDiary.model.DairyPost;
import com.DeveloperDiary.repo.DairyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DairyService {

    private final DairyRepo repo;

    @Autowired
    public DairyService(DairyRepo repo) {
        this.repo = repo;
    }

    public List<DairyPost> getAllPosts(String ownerUsername) {
        return repo.findByOwnerUsername(ownerUsername);
    }

    public DairyPost addPost(DairyPost post, String ownerUsername) {
        // dairyId is auto-generated and ownerUsername always comes from the
        // authenticated user - never from the request body - so a post can
        // never be created for, or on behalf of, someone else.
        post.setDairyId(null);
        post.setOwnerUsername(ownerUsername);
        return repo.save(post);
    }

    public Optional<DairyPost> getPost(Long dairyId, String ownerUsername) {
        return repo.findByDairyIdAndOwnerUsername(dairyId, ownerUsername);
    }

    public Optional<DairyPost> updatePost(DairyPost dairyPost, String ownerUsername) {
        // Only overwrite a post that already belongs to this user.
        return repo.findByDairyIdAndOwnerUsername(dairyPost.getDairyId(), ownerUsername)
                .map(existing -> {
                    dairyPost.setOwnerUsername(ownerUsername);
                    return repo.save(dairyPost);
                });
    }

    public boolean deletePost(Long dairyId, String ownerUsername) {
        return repo.findByDairyIdAndOwnerUsername(dairyId, ownerUsername)
                .map(post -> {
                    repo.deleteByDairyIdAndOwnerUsername(dairyId, ownerUsername);
                    return true;
                })
                .orElse(false);
    }

    public List<DairyPost> searchByKeyword(String keyword, String ownerUsername) {
        return repo.searchByOwnerAndKeyword(ownerUsername, keyword);
    }

    // Loads some sample data for the currently logged-in user so the demo
    // dashboard isn't empty. Each call adds a fresh set of rows (IDs are
    // auto-generated), scoped to that user only.
    public void load(String ownerUsername) {
        List<DairyPost> posts = List.of(
                newPost("Slow Internet", "Faced frequent disconnections", "Restarted router and limited background apps", "Check for better ISP plans", "Productivity dropped due to slow network", ownerUsername),
                newPost("Spring Boot Error", "App crashed on start", "Resolved missing dependency issue", "Practice exception handling more", "Learned to debug logs effectively", ownerUsername),
                newPost("Poor Time Management", "Wasted time scrolling social media", "Used Pomodoro technique to regain focus", "Stick to time blocks strictly", "Realized how distractions ruin flow", ownerUsername),
                newPost("UI Design Confusion", "Layout looked messy", "Refactored with Material UI grid system", "Study modern UI patterns", "Users gave better feedback after changes", ownerUsername),
                newPost("Database Connectivity", "JPA wasn't saving data", "Fixed application.properties configs", "Revise DB connection setup", "Learned about JDBC vs JPA details", ownerUsername),
                newPost("Team Miscommunication", "Missed feature requirement", "Scheduled a sync-up call", "Always confirm tasks on Slack", "Better clarity among team after meeting", ownerUsername),
                newPost("Low Motivation", "Didn't feel like working", "Watched tech talk and took a break", "Include short breaks in routine", "Breaks helped regain energy and focus", ownerUsername)
        );
        repo.saveAll(posts);
    }

    private DairyPost newPost(String faced, String learned, String improvements, String tomorrowPlan, String description, String ownerUsername) {
        DairyPost post = new DairyPost();
        post.setDairyFaced(faced);
        post.setDairyLearned(learned);
        post.setDairyImprovements(improvements);
        post.setDairyTomorrowPlan(tomorrowPlan);
        post.setDairyDescription(description);
        post.setOwnerUsername(ownerUsername);
        return post;
    }
}
