package com.soo.boardback.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soo.boardback.entity.FavoriteEntity;
import com.soo.boardback.entity.primaryKey.FavoritePk;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> { // Favorite은 복합키라서 entity에 FavoritePk.java를 만들어주고 FavoriteEntity에서 @IdClass 사용
    
    boolean existsByUserEmailAndBoardNumber(String userEmail, Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
