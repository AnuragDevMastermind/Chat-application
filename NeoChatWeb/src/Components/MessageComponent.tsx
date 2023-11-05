import React from 'react';
import styles from './Home.module.css';

interface MessageComponentProps {
  imageSrc: string;
  fullName: string;
  time: string;
  message: string;
  isHighlighted: boolean;
  onClick: () => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  imageSrc,
  fullName,
  time,
  message,
  isHighlighted,
  onClick,
}) => {
  const componentClass = isHighlighted ? styles.messageComponent1 : styles.messageComponent;

  return (
    <div className={componentClass} onClick={onClick}>
      <img className={styles.messageComponentChild} alt="" src={imageSrc} />
      <div className={styles.frameGroup}>
        <div className={styles.frameContainer}>
          <div className={styles.fullNameHereParent}>
            <div className={styles.fullNameHere}>{fullName}</div>
            <div className={styles.m}>{time}</div>
          </div>
          <div className={styles.enterYourMessage}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
