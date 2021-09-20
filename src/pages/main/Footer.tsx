import React from 'react';
import styles from '../../css/Main.module.css';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.aboutContainer}>
        <h3>About Us</h3>
        <a
          href="https://github.com/SungSeokMin/urproject"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className={styles.githubIcon} />
          Github
        </a>
      </div>
      <div className={styles.contactContainer}>
        <h3>Contact</h3>
        <a
          href="https://github.com/Seongseokwon"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className={styles.githubIcon} />
          Sung Seokwon
        </a>
        <a
          href="https://github.com/SungSeokMin"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className={styles.githubIcon} />
          Sung Seokmin
        </a>
      </div>
    </div>
  );
}

export default Footer;
