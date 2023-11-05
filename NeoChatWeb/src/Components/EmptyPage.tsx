import React from 'react';
import styles from './Home.module.css';

const EmptyPage: React.FC = () => {
  return (
    <div className={styles.empty}>
      <img className={styles.artwork1Icon} alt="" src="/artwork-1.svg" />
      <div className={styles.text}>
        <div className={styles.pageNotFound}>Neochat web</div>
        <div className={styles.loremIpsumDolor}>
          Send and receive messages without keeping your phone online
        </div>
      </div>
      <div className={styles.text1}>
        <img
          className={styles.lockFill0Wght400Grad0Opsz2Icon}
          alt=""
          src="/lock-s.svg"
        />
        <div className={styles.loremIpsumDolor1}>
          Your personal messages are end-to-end encrypted
        </div>
      </div>
    </div>
  );
}

export default EmptyPage;
