package com.soo.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soo.boardback.entity.BoardEntity;

// CREAtE, UPDATE, DELETE는 BoardRepository에서 작업하고 Read는 BoardView에서 작업할 예정
@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    boolean existsByBoardNumber(Integer boardNumber);

    BoardEntity findByBoardNumber(Integer boardNumber);
    
}
