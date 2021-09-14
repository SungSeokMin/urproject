import React from 'react';
import styles from '../../css/Main.module.css';
import IntroPage from './IntroPage';

function Main() {
  return (
    <div className={styles.mainContainer}>
      <IntroPage />
    </div>
  );
}

export default Main;
