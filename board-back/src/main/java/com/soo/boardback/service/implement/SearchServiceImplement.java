package com.soo.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.soo.boardback.dto.response.ResponseDto;
import com.soo.boardback.dto.response.search.GetPopularListResponseDto;
import com.soo.boardback.repository.SearchLogRepository;
import com.soo.boardback.repository.resultSet.SearchWordResultSet;
import com.soo.boardback.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {

    private final SearchLogRepository searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {

        List<SearchWordResultSet> resultSets = new ArrayList<>();

        try {

            resultSets = searchLogRepository.getPopularWordList();
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetPopularListResponseDto.success(resultSets);
    }
    
}
