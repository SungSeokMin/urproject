import React from 'react';
import styles from '../../css/Main.module.css';

function Description() {
  return (
    <div className={styles.descriptionPage}>
      <div className={styles.titleArea}>
        <div className={styles.mainTitle}>
          프로젝트를
          <br />
          자랑해보세요!
        </div>
        <div className={styles.subTitle}>
          프로젝트를 만들었는데 소개할 곳이 없었나요 ?<br />
          이제 Ur Project에서 자랑해보세요.
        </div>
      </div>
      <div className={styles.descriptionImage}>
        <img src="/images/main-1.svg" alt="소개" />
      </div>
    </div>
  );
}

export default Description;
