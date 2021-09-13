import React, { useState, ChangeEvent } from 'react';

import styles from './Modal.module.css';
import { MdClose } from 'react-icons/md';

type LoginModalProps = {
  requestLogin: (email: string, password: string) => void;
  showSignUpModal: () => void;
  notShow: () => void;
};

function LoginModal({
  requestLogin,
  showSignUpModal,
  notShow,
}: LoginModalProps) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = () => {
    requestLogin(email, password);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.loginBox}>
        <div className={styles.imgContainer}>
          <img src="images/welcome.svg" alt="로그인" />
        </div>
        <div className={styles.inputContainer}>
          <MdClose className={styles.icons} onClick={notShow} />
          <span>로그인</span>
          <div className={styles.infoContainer}>
            <b>이메일</b>
            <input
              type="text"
              name="email"
              className={styles.email}
              onChange={onChange}
            />
            <b>비밀번호</b>
            <input
              type="password"
              name="password"
              className={styles.password}
              onChange={onChange}
            />
            <button className={styles.signinBtn} onClick={handleLogin}>
              로그인
            </button>
          </div>
          <div className={styles.moveSignupContainer}>
            <span>아직 회원이 아니신가요?</span>
            <button className={styles.moveSignupPage} onClick={showSignUpModal}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
