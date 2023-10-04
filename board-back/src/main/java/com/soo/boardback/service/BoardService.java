package com.soo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.soo.boardback.dto.request.board.PostBoardRequestDto;
import com.soo.boardback.dto.response.board.GetBoardResponseDto;
import com.soo.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.soo.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();

}
