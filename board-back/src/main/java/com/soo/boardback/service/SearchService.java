package com.soo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.soo.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
}
