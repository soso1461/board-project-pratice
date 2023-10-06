package com.soo.boardback.dto.request.board;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentRequestDto {
    @NotBlank   // ! @NotBlank는 문자열에서만 쓰임 Integer는 NotNull
    private String content;
}
