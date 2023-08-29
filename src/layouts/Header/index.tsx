import React, { ChangeEvent, useState } from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH, BOARD_WRITE_PATH, SEARCH_PATH, BOARD_DETAIL_PATH, USER_PATH, BOARD_UPDATE_PATH } from 'constant';

//          component: 헤더 컴포넌트          //
export default function Header() {

  //          state: path name 상태         //
  const { pathname } = useLocation();

  //          variable: 인증 페이지 논리 변수         //
  const isAuthPage = pathname === AUTH_PATH;
  //          variable: 메인 페이지 논리 변수         //
  const isMainPage = pathname === MAIN_PATH;
  //          variable: 검색 페이지 논리 변수         //
  const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
  //          variable: 게시물 상세 페이지 논리 변수         //
  const isBoardDetailPage = pathname.startsWith(BOARD_DETAIL_PATH(''));
  //          variable: 유저 페이지 논리 변수         //
  const isUserPage = pathname.startsWith(USER_PATH(''));
  //          variable: 게시물 작성 페이지 논리 변수         //
  const isBoardWritePage = pathname === BOARD_WRITE_PATH;
  //          variable: 게시물 수정 페이지 논리 변수         //
  const isBoardUpdatePage = pathname.startsWith(BOARD_UPDATE_PATH(''));

  //          function: 네비게이트 함수           //
  const navigator = useNavigate();

  //          event handler: 로고 클릭 이벤트 처리          //
  const onLogoClickHandler = () => {
    navigator('/');
  }

  //          component: 검색 컴포넌트          //
  const Search = () => {

    //          state: 검색 버튼 상태         //
    const [showInput, setShowInput] = useState<boolean>(false);

    //          state: 검색 값 상태         //
    const [searchValue, setSearchValue] = useState<string>('');
    
    //           event handler: 검색 값 변경 이벤트 처리         //
    const onSearchValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setSearchValue(searchValue);
    }

    //           event handler: 검색 버튼 클릭 이벤트 처리         //
    const onSearchButtonClickHandler = () => {
      setShowInput(!showInput);
    }

    //          render: 검색 컴포넌트 렌더링          //
    if (showInput)
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' value={searchValue} onChange={onSearchValueChangeHandler} />
        <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='search-icon'></div>
        </div>
      </div>
    );
    return (
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='search-icon'></div>
        </div>
    );  
  }

  //          render: 헤더 컴포넌트 렌더링          //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='header-logo-icon-box'>
            <div className='logo-dark-icon'></div>
          </div>
          <div className='header-logo-text'>{"Hoons Board"}</div>
        </div>
        <div className='header-right-box'>
          {isAuthPage && (<Search />)}
          {isMainPage && (<></>)}
          {isSearchPage && (<></>)}
          {isBoardDetailPage && (<></>)}
          {isUserPage && (<></>)}
          {isBoardWritePage && (<></>)}
          {isBoardUpdatePage && (<></>)}
        </div>
      </div>
    </div>
  );
}
