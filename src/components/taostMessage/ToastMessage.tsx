import React from 'react';
import styles from '../../css/ToastMessage.module.css';

type ToastMessageProps = {
  message: string;
};

function ToastMessage({ message }: ToastMessageProps) {
  return <div className={styles.toastContainer}>{message}</div>;
}

export default ToastMessage;
