import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../modules/index';
import { userLoginAsync } from '../modules/thunks';
import { logout } from '../modules/user';
import LoginModal from '../pages/modal/LoginModal';
import SignUpModal from '../pages/modal/SignUpModal';

function HeaderContainer() {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  const requestLogin = (email: string, password: string) => {
    dispatch(userLoginAsync(email, password));
  };

  const handleLogout = () => {
    dispatch(logout());
    notShow();
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
          {isLogin ? (
            <button className="signIn" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button className="signIn" onClick={showLoginModal}>
              로그인
            </button>
          )}

          {/* isLogin && <Link to='/post/>게시판</Link */}
          <Link to="/post">프로젝트</Link>
        </div>
      </header>
      {!isLogin && signIn && (
        <LoginModal
          requestLogin={requestLogin}
          showSignUpModal={showSignUpModal}
          notShow={notShow}
        />
      )}
      {!isLogin && signUp && (
        <SignUpModal showLoginModal={showLoginModal} notShow={notShow} />
      )}
    </>
  );
}

export default HeaderContainer;
