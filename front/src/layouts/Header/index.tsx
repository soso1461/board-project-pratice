import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH, BOARD_WRITE_PATH, SEARCH_PATH, BOARD_DETAIL_PATH, USER_PATH, BOARD_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useUserStore } from 'stores';
import { LoginUser } from 'types';
import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/dto/request/board';

//          component: 헤더 컴포넌트          //
export default function Header() {

  //          state: path name 상태         //
  const { pathname } = useLocation();
  //          state: 로그인 유저 상태         //
  const { user, setUser } = useUserStore();
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

    //           event handler: 검색 인풋 Enter key down 이벤트 처리         //
    const onSearchEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchValue) return;
      navigator(SEARCH_PATH(searchValue));
    }
    //           event handler: 검색 버튼 클릭 이벤트 처리         //
    const onSearchButtonClickHandler = () => {
      if (!showInput) {
        setShowInput(true);
        return;
      }
      if (!searchValue) {
        setShowInput(false);
        return;
      }
      navigator(SEARCH_PATH(searchValue));
    }

    //          render: 검색 컴포넌트 렌더링 (인풋이 보임 상태일 때)          //
    if (showInput)
      return (
        <div className='header-search-input-box'>
          <input className='header-search-input' type='text' value={searchValue} onChange={onSearchValueChangeHandler} onKeyDown={onSearchEnterKeyDownHandler}/>
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
    
    //          event handler : 마이페이지 버튼 클릭 이벤트 처리          //
    const onMyPageButtonClickHandler = () => {
      if (!user) return;
      navigator(USER_PATH(user.email));
    }
    
    //          event handler : 로그인 버튼 클릭 이벤트 처리          //
    const onLoginButtonClickHandler = () => {
      navigator(AUTH_PATH);
    }

    //          render: 마이페이지 버튼 컴포넌트 렌더링 (로그인 상태일 때)          //
    if (cookies.accessToken)
      return (
        <div className='mypage-button' onClick={onMyPageButtonClickHandler}>마이페이지</div>
      )
    //          render: 로그인 버튼 컴포넌트 렌더링 (로그인 상태가 아닐 때)          //
      return (
        <div className='login-button' onClick={onLoginButtonClickHandler}>로그인</div>
      )
  }

  //          component: 업로드 버튼 컴포넌트         //
  const UploadButton = () => { 
    
    //          state: 게시물 제목, 내용, 이미지 전역 상태         //
    const { title, contents, images, resetBoard } = useBoardStore();

    //          function: post board response 처리 함수         //
    const postBoardResponse = (code: string) => {
      if (code === 'VF') alert('모두 입력하세요.');
      if (code === 'NU' || code === 'AF') {
        navigator(AUTH_PATH);
        return;
      }
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!user) return;
      const { email } = user;
      navigator(USER_PATH(email));
    }

    //          event handler: 업로드 버튼 클릭 이벤트 처리         //
    const onUploadButttonClickHandler = async () => {

      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const boardImageList: string[] = [];

      for (const image of images) {
        const data = new FormData();
        data.append('file', image);
  
        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }

      if (isBoardWritePage) {
        const requestBody: PostBoardRequestDto = {
          title, content: contents, boardImageList
        }
        postBoardRequest(requestBody, accessToken).then(postBoardResponse);
      }
      if (isBoardUpdatePage) {
        alert('수정');
        resetBoard();
      }
    }

    //          render: 업로드 버튼 (Active) 컴포넌트 렌더링          //
    if (title && contents)
    return (<div className='upload-button' onClick={onUploadButttonClickHandler}>업로드</div>);
    //          render: 업로드 버튼 (disable) 컴포넌트 렌더링          //
    // else
    return (<div className='upload-button-disable'>업로드</div>);
  }

  //          component: 유저 페이지 버튼 컴포넌트         //
  const UserPageButtons = () => {

    //          state: path variable의 email 상태           //
    const { searchEmail } = useParams();

    //          variable: 마이페이지 여부 논리 변수         //
    const isMyPage = user && user.email === searchEmail;
    
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리          //
    const onLogoutButtonClickHandler = () => {
      setCookies('email', '', { path: '/', expires: new Date() });
      setUser(null);
    }
    
    //          render: 본인 페이지일 때 버튼 컴포넌트 렌더링         //
    if (isMyPage)
    return (<div className='logout-button' onClick={onLogoutButtonClickHandler}>로그아웃</div>);
    //          render: 타인 페이지일 때 버튼 컴포넌트 렌더링         //
    return (<LoginMyPageButton />);
  }

  //          effect: 마운트시에만 실행될 함수          //
  useEffect(() => {
    // setCookies('email', 'email@email.com', { path: '/', expires: new Date() }); // 오늘 날짜 기준으로 쿠키 기록을 지움
    // setCookies('email', 'email@email.com', { path: '/' });
    // const user: LoginUser = { email: 'email@email.com', nickname: '주코야키', profileImage: '' };
    // setUser(user);
    if (cookies.email) {
      const user: LoginUser = { email: cookies.email, nickname: '주코야키', profileImage: null }
      setUser(user);
    }
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
          {isUserPage && (<UserPageButtons />)} 
          {isBoardWritePage && (<UploadButton />)}
          {isBoardUpdatePage && (<UploadButton />)}
        </div>
      </div>
    </div>
  );
}