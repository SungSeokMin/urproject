import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from '../css/NotFound.module.css';
import { AiOutlineRollback } from 'react-icons/ai';

type NotFoundProps = RouteComponentProps;

function NotFound({ history }: NotFoundProps) {
  const goHome = () => {
    history.push('/');
  };
  return (
    <div className={styles.notFoundContainer}>
      <img src="/images/notFound.svg" alt="notFound" />
      <p>잘못된 접근입니다.</p>
      <AiOutlineRollback className={styles.back} onClick={goHome} />
    </div>
  );
}

export default NotFound;
