import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RootState } from '../modules/index';
import { userLoginAsync } from '../modules/thunk/userThunks';
import { logout } from '../modules/user';
import LoginModal from '../pages/modal/LoginModal';
import SignUpModal from '../pages/modal/SignUpModal';

type HeaderContainerProps = RouteComponentProps;

function HeaderContainer({ history }: HeaderContainerProps) {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showLoginModal = () => {
    setSignIn(true);
    setSignUp(false);
  };

  const showSignUpModal = () => {
    setSignIn(false);
    setSignUp(true);
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
    history.push('/');
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
          {!isLogin && <button onClick={showSignUpModal}>회원가입</button>}
          {isLogin && (
            <Link to="/post/">
              <AiOutlineFundProjectionScreen />
              프로젝트
            </Link>
          )}
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

export default withRouter(HeaderContainer);
