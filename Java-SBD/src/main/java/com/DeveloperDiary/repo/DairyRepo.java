package com.DeveloperDiary.repo;

import com.DeveloperDiary.model.DairyPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DairyRepo extends JpaRepository<DairyPost, Integer> {

    List<DairyPost> findByDairyFacedContainingOrDairyLearnedContainingOrDairyImprovementsContainingOrDairyTomorrowPlanContainingOrDairyDescriptionContaining
            (String dairyFaced,String dairyLearned, String dairyImprovements, String dairyTomorrowPlan, String dairyDescription);


}