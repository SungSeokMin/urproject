import React, { ChangeEvent, useState } from 'react';
import styles from '../../css/Modal.module.css';
import { MdClose, MdCheckCircle } from 'react-icons/md';

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

  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  const { email, nickname, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const REG_EMAIL =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const REG_PASSWORD =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

    if (name === 'email') {
      if (REG_EMAIL.test(value)) setEmailCheck(true);
      else setEmailCheck(false);
    } else if (name === 'nickname') {
      if (value.length > 2 && value.length < 7) setNicknameCheck(true);
      else setNicknameCheck(false);
    } else if (name === 'password') {
      if (REG_PASSWORD.test(value)) setPasswordCheck(true);
      else setPasswordCheck(false);
    }

    setInputs({ ...inputs, [name]: value });
  };

  const handleSignup = () => {
    if (emailCheck === false) {
      alert('이메일 형식을 확인해주세요.');
      return;
    } else if (nicknameCheck === false) {
      alert('닉네임 형식을 확인해주세요.');
      return;
    } else if (passwordCheck === false) {
      alert('비밀번호 형식을 확인해주세요.');
      return;
    }

    // requestSignup(email, nickname, password);
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
            <b>
              이메일
              {email.length === 0 ? null : emailCheck ? (
                <MdCheckCircle className={styles.success} />
              ) : (
                <MdCheckCircle className={styles.fail} />
              )}
            </b>
            <input
              type="text"
              name="email"
              className={styles.email}
              onChange={onChange}
              placeholder="ex) abcd@gmail.com"
            />
            <b>
              닉네임
              {nickname.length === 0 ? null : nicknameCheck ? (
                <MdCheckCircle className={styles.success} />
              ) : (
                <MdCheckCircle className={styles.fail} />
              )}
            </b>
            <input
              type="text"
              name="nickname"
              className={styles.nickName}
              onChange={onChange}
              placeholder="2~6자리"
            />
            <b>
              비밀번호
              {password.length === 0 ? null : passwordCheck ? (
                <MdCheckCircle className={styles.success} />
              ) : (
                <MdCheckCircle className={styles.fail} />
              )}
            </b>
            <input
              type="password"
              name="password"
              className={styles.password}
              onChange={onChange}
              placeholder="숫자, 영문, 특수문자 8~16자리"
            />
            <button className={styles.signupBtn} onClick={handleSignup}>
              회원가입
            </button>
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
