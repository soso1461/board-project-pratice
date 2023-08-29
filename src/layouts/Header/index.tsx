import { ChangeEvent, useState, useEffect } from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH, BOARD_WRITE_PATH, SEARCH_PATH, BOARD_DETAIL_PATH, USER_PATH, BOARD_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';

//          component: 헤더 컴포넌트          //
export default function Header() {

  //          state: path name 상태         //
  const { pathname } = useLocation();
  //          state: cookie 상태         //
  const [cookies, setCookies] = useCookies();

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
      if (showInput) {
        
      }
      setShowInput(!showInput);
    }

    //          render: 검색 컴포넌트 렌더링 (인풋 보임 상태일 때)          //
    if (showInput)
      return (
        <div className='header-search-input-box'>
          <input className='header-search-input' type='text' value={searchValue} onChange={onSearchValueChangeHandler} />
          <div className='icon-button' onClick={onSearchButtonClickHandler}>
            <div className='search-icon'></div>
          </div>
        </div>
      );
    //          render: 검색 컴포넌트 렌더링 (인풋이 보임 상태가 아닐 때)          //
    return (
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='search-icon'></div>
      </div>
    );
  };
//          component: 로그인 상태에 따라 로그인 혹은 마이페이지 버튼 컴포넌트          //
  const LoginMyPageButton = () => {
    
    //          render: 마이페이지 버튼 컴포넌트 렌더링 (로그인 상태일 때)          //
    if (cookies.email)
      return (
        <div className='mypage-button'>마이페이지</div>
      )
    //          render: 로그인 버튼 컴포넌트 렌더링 (로그인 상태가 아닐 때)          //
      return (
        <div className='login-button'>로그인</div>
      )
  }

  //          effect: 마운트시에만 실행될 함수          //
  useEffect(() => {
    // setCookies('email', 'email@email.com', { path: '/', expires: new Date() }); // 오늘 날짜 기준으로 쿠키 기록을 지움
    setCookies('email', 'email@email.com', { path: '/' });
   }, []);

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
          {isMainPage && (<> <Search /> <LoginMyPageButton /> </>)}
          {isSearchPage && (<> <Search /> <LoginMyPageButton /> </>)}
          {isBoardDetailPage && (<> <Search /> <LoginMyPageButton /> </>)}
          {isUserPage && (<></>)}
          {isBoardWritePage && (<></>)}
          {isBoardUpdatePage && (<></>)}
        </div>
      </div>
    </div>
  );
}
