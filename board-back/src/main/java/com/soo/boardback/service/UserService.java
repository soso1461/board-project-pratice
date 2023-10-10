package com.soo.boardback.service;

import org.springframework.http.ResponseEntity;

import com.soo.boardback.dto.request.user.PatchNicknameRequestDto;
import com.soo.boardback.dto.response.user.GetSignInUserResponseDto;
import com.soo.boardback.dto.response.user.GetUserResponseDto;
import com.soo.boardback.dto.response.user.PatchNicknameResponseDto;

public interface UserService {

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    ResponseEntity<? super GetUserResponseDto> getUser(String email);

    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);
    
}
