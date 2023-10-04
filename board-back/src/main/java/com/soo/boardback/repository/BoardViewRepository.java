package com.soo.boardback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soo.boardback.entity.BoardViewEntity;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardViewEntity, Integer> {

    List<BoardViewEntity> findByOrderByWriteDatetimeDesc();

}
