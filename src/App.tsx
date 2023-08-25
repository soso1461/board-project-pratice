import React, { useState } from 'react';
import './App.css';
import { commentListMock, top3ListMock } from 'mocks';
import Top3ListItem from 'components/Top3ListItem';
import CommentListItem from 'components/CommentListItem';
import Footer from 'layouts/Footer';

function App() {
  return (
    <div>
      <div style={{ width: '1500px', display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
        {top3ListMock.map((boardItem) => (<Top3ListItem boardItem={boardItem} />))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div style= {{ display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {commentListMock.map((commentItem) => (<CommentListItem commentItem={commentItem} />))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

// ! 네비게이션 설계
// ! 메인 화면 : '/' - Main
// ! 로그인 화면 + 회원가입 화면 : /auth - Authentication
// ! 검색 화면 : '/search/:word' - Search
// ! 게시물 상세 보기 화면 : '/board/detail/:boardNumber' - BoardDetail
// ! 게시물 작성 화면 : '/board/write' - BoardWrite
// ! 게시물 수정 화면 : '/board/update/:boardNumber' - BoardUpdate
// ! 유저 게시물 화면 : '/user/:email' - User