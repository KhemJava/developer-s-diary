package com.DeveloperDiary.repo;

import com.DeveloperDiary.model.DairyPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DairyRepo extends JpaRepository<DairyPost, Long> {

    // Scope every read/write to the logged-in user so nobody can ever see
    // or touch another user's entries.
    List<DairyPost> findByOwnerUsername(String ownerUsername);

    Optional<DairyPost> findByDairyIdAndOwnerUsername(Long dairyId, String ownerUsername);

    void deleteByDairyIdAndOwnerUsername(Long dairyId, String ownerUsername);

    @Query("SELECT d FROM DairyPost d WHERE d.ownerUsername = :owner AND (" +
            "LOWER(d.dairyFaced) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dairyLearned) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dairyImprovements) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dairyTomorrowPlan) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dairyDescription) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<DairyPost> searchByOwnerAndKeyword(@Param("owner") String owner, @Param("keyword") String keyword);
}
