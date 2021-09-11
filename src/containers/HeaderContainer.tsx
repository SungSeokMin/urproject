import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../modules/index';
import LoginModal from '../pages/modal/LoginModal';
import SignUpModal from '../pages/modal/SignUpModal';

function HeaderContainer() {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showLoginModal = () => {
    setSignIn(!signIn);
    setSignUp(false);
  };

  const showSignUpModal = () => {
    setSignIn(false);
    setSignUp(!signUp);
  };

  const notShow = () => {
    setSignIn(false);
    setSignUp(false);
  };

  return (
    <>
      <header>
        <div className="logo-container">
          <Link to="/">
            <img src="/logo.png" alt="로고" />
          </Link>
        </div>
        <div className="signIn-signUp">
          <button className="signIn" onClick={showLoginModal}>
            {isLogin ? '로그아웃' : '로그인'}
          </button>
        </div>
      </header>
      {signIn && (
        <LoginModal showSignUpModal={showSignUpModal} notShow={notShow} />
      )}
      {signUp && (
        <SignUpModal showLoginModal={showLoginModal} notShow={notShow} />
      )}
    </>
  );
}

export default HeaderContainer;
