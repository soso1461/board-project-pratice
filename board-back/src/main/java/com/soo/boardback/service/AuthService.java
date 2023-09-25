package com.soo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.soo.boardback.dto.request.auth.SignInRequestDto;
import com.soo.boardback.dto.request.auth.SignUpRequestDto;
import com.soo.boardback.dto.response.auth.SignInResponseDto;
import com.soo.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

}
