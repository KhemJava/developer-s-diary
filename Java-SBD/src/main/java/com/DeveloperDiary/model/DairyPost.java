package com.DeveloperDiary.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DairyPost {

    @Id
    private int dairyId;
    private String dairyFaced;
    private String dairyLearned;
    private String dairyImprovements;
    private String dairyTomorrowPlan;
    private String dairyDescription;

}