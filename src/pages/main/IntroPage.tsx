import React from 'react';
import styles from '../../css/Main.module.css';

function IntroPage() {
  return (
    <div
      className={styles.introPage}
      style={{ backgroundImage: 'url(/images/main-1.png)' }}
    >
      <div className={styles.gifContainer}>
        <img src="/gif/use-urproject.gif" alt="사용법" />
      </div>
    </div>
  );
}

export default IntroPage;
