import React from 'react';
import styles from '../../css/Main.module.css';

function SharePage() {
  return (
    <div className={styles.sharePage}>
      <div className={styles.shareImage}>
        <img src="/images/main-2.svg" alt="공유" />
      </div>
      <div className={styles.titleArea}>
        <div className={styles.mainTitle}>
          링크를 복사하고
          <br />
          공유해보세요!
        </div>
        <div className={styles.subTitle}>
          마음에 드는 페이지 링크를 복사하고
          <br />
          주변 사람들에게 공유해보세요.
        </div>
      </div>
    </div>
  );
}

export default SharePage;
