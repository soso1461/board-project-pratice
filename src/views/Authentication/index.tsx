import React, { useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox'

//          component: 인증 페이지          //
export default function Authentication() {
  //            state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');   // 기본값 sign-in

  const SignInCard = () => {
    const [email, setEmail] = useState<string>('');   // ('')은 초기값을 뜻함
    const [emailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('비밀번호는 8자 이상 입력해주세요.');
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');
  
    const onPasswordIconClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password');
        setPasswordIcon('eye-off-icon');
      }
      if (passwordType === 'password') {
        setPasswordType('text');
        setPasswordIcon('eye-on-icon');
      }
    }
    return (
      <div className='auth-card'>
        <div className='auth-card-top'>
          <div className='auth-card-title-box'>
            <div className='auth-card-title'>{'로그인'}</div>
          </div>
          <InputBox label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={emailError} value={email} setValue={setEmail} />
          <InputBox label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={passwordError} errorMessage={passwordErrorMessage} value={password} setValue={setPassword} icon={passwordIcon} onButtonClick={onPasswordIconClickHandler} />
        </div>
        <div className='auth-card-botttom'>
          <div className='auth-sign-in-error-box'>
            <div className='auth-sign-in-error-message'>
              {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
            </div>
          </div>
          <div className='auth-button'>{'로그인'}</div>
          <div className='auth-description-box'>
            <div className='auth-description'>{'신규 사용자이신가요? '}<span className='description-emphasis'>{'회원가입'}</span></div>
          </div>
        </div>
      </div>
    );
  }
  
  const SignUpCard = () => {
    return (<></>);
  }

  //          render: 인증 페이지 렌더링          //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='jumbotron-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다😊'}</div>
              <div className='auth-jumbotron-text'>{'HOONS BOARD📖 입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-in' && <SignUpCard />}
        {/* <div className='auth-card'></div> */}
      </div>
    </div>
  );
}
