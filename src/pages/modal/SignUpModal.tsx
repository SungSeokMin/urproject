import React, { ChangeEvent, useState } from 'react';
import styles from './Modal.module.css';
import { MdClose } from 'react-icons/md';

type SignUpModalProps = {
  showLoginModal: () => void;
  notShow: () => void;
};

function SignUpModal({ showLoginModal, notShow }: SignUpModalProps) {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.loginBox}>
        <div className={styles.imgContainer}>
          <img src="images/welcome.svg" alt="회원가입" />
        </div>
        <div className={styles.inputContainer}>
          <MdClose className={styles.icons} onClick={notShow} />
          <span>회원가입</span>
          <div className={styles.infoContainer}>
            <b>이메일</b>
            <input
              type="text"
              name="email"
              className={styles.email}
              onChange={onChange}
            />
            <b>닉네임</b>
            <input
              type="text"
              name="nickname"
              className={styles.nickName}
              onChange={onChange}
            />
            <b>비밀번호</b>
            <input
              type="password"
              name="password"
              className={styles.password}
              onChange={onChange}
            />
            <button className={styles.signupBtn}>회원가입</button>
          </div>
          <div className={styles.moveSignupContainer}>
            <span>이미 회원이신가요?</span>
            <button className={styles.moveSignupPage} onClick={showLoginModal}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
