package com.DeveloperDiary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dairyId;

    private String dairyFaced;
    private String dairyLearned;
    private String dairyImprovements;
    private String dairyTomorrowPlan;
    private String dairyDescription;

    // Username of the account that owns this entry. Set server-side only,
    // never trusted from client input, so a user can never read or edit
    // someone else's diary entries.
    private String ownerUsername;
}
