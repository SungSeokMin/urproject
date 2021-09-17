import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styles from '../../css/Modal.module.css';
import { MdClose, MdCheckCircle } from 'react-icons/md';
import { checkEmail, checkNickname, userSignUp } from '../../api/users';

type SignUpModalProps = {
  showLoginModal: () => void;
  notShow: () => void;
  handleToast: (message: string) => void;
};

function SignUpModal({
  showLoginModal,
  notShow,
  handleToast,
}: SignUpModalProps) {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
  });

  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  const nicknameRef = useRef<HTMLInputElement>(null);

  const { email, nickname, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const REG_EMAIL =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const REG_PASSWORD =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

    if (name === 'email') {
      REG_EMAIL.test(value) ? setEmailCheck(true) : setEmailCheck(false);
    } else if (name === 'nickname') {
      value.length > 2 && value.length < 7
        ? setNicknameCheck(true)
        : setNicknameCheck(false);
    } else if (name === 'password') {
      REG_PASSWORD.test(value)
        ? setPasswordCheck(true)
        : setPasswordCheck(false);
    }

    setInputs({ ...inputs, [name]: value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailCheck && nicknameCheck && passwordCheck) {
      // 유효성 검사 성공
      const emailValidator = await checkEmail(email);
      const nicknameValidator = await checkNickname(nickname);
      if (!emailValidator && !nicknameValidator) {
        // 중복된 email, nickname 없음
        // 회원가입 요청
        userSignUp(email, nickname, password);
        handleToast('회원가입이 완료되었습니다.');
        showLoginModal();
      } else {
        handleToast('중복된 닉네임 입니다.');

        if (nicknameRef.current !== null) nicknameRef.current.focus();
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.loginBox}>
        <div className={styles.imgContainer}>
          <img src="/images/welcome.svg" alt="회원가입" />
        </div>
        <div className={styles.inputContainer}>
          <MdClose className={styles.icons} onClick={notShow} />
          <span>회원가입</span>
          <form className={styles.infoContainer} onSubmit={handleSignup}>
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
              ref={nicknameRef}
              placeholder="닉네임을 입력해주세요."
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
              autoComplete="off"
              placeholder="숫자, 영문, 특수문자 8~16자리"
            />
            <button type="submit" className={styles.signupBtn}>
              회원가입
            </button>
          </form>
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
