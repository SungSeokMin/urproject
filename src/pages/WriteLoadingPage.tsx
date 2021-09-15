import React from 'react';
import { MdCloudUpload } from 'react-icons/md';
import styles from '../css/WriteLoadingPage.module.css';

function WriteLoadingPage() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingAnimation}>
        <MdCloudUpload className={styles.icon} />
        <div className={styles.loadingBar}></div>
      </div>
    </div>
  );
}

export default WriteLoadingPage;
