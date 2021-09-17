import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RootState } from '../modules/index';
import { userLoginAsync } from '../modules/thunk/userThunks';
import { logout } from '../modules/user';
import LoginModal from '../pages/modal/LoginModal';
import SignUpModal from '../pages/modal/SignUpModal';
import styles from '../css/Header.module.css';
import ToastMessage from '../components/taostMessage/ToastMessage';

type HeaderContainerProps = RouteComponentProps;

function HeaderContainer({ history }: HeaderContainerProps) {
  const [toastStatus, setToastStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (toastStatus) setTimeout(() => setToastStatus(false), 1000);
  }, [toastStatus]);

  const handleToast = (message: string) => {
    setToastStatus(true);
    setToastMessage(message);
  };

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
    dispatch(userLoginAsync(email, password, handleToast));
  };

  const handleLogout = () => {
    dispatch(logout());
    notShow();
    history.push('/');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src="/logo.png" alt="로고" />
          </Link>
        </div>

        <div className={styles.menuContainer}>
          <Link to="/post" className={styles.projectLink}>
            <AiOutlineFundProjectionScreen />
            프로젝트
          </Link>
        </div>

        <div className="user-conatiner">
          {isLogin ? (
            <button className={styles.signOutBtn} onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button className={styles.loginBtn} onClick={showLoginModal}>
              로그인
            </button>
          )}
          {!isLogin && (
            <button className={styles.signUpBtn} onClick={showSignUpModal}>
              회원가입
            </button>
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
        <SignUpModal
          showLoginModal={showLoginModal}
          notShow={notShow}
          handleToast={handleToast}
        />
      )}
      {toastStatus && <ToastMessage message={toastMessage} />}
    </>
  );
}

export default withRouter(HeaderContainer);
