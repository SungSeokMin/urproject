import React from 'react';
import styles from '../../css/Main.module.css';
import Description from './Description';
import IntroPage from './IntroPage';
import SharePage from './SharePage';

type MainProps = {
  showSignUpModal: () => void;
};

function Main({ showSignUpModal }: MainProps) {
  return (
    <div className={styles.mainContainer}>
      <Description />
      <SharePage />
      <IntroPage showSignUpModal={showSignUpModal} />
    </div>
  );
}

export default Main;
