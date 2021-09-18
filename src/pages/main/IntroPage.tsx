import React from 'react';
import styles from '../../css/Main.module.css';

type IntroPageProps = {
  showSignUpModal: () => void;
};

function IntroPage({ showSignUpModal }: IntroPageProps) {
  const showModalHandler = () => {
    window.scrollTo(0, 0);
    showSignUpModal();
  };

  return (
    <div
      className={styles.introPage}
      style={{ backgroundImage: 'url(/images/main-3.png)' }}
    >
      <div className={styles.gifContainer}>
        <img src="/gif/use-urproject.gif" alt="사용법" />
      </div>
      <div className={styles.startService}>
        <button onClick={showModalHandler}>시작하기</button>
      </div>
    </div>
  );
}

export default IntroPage;
