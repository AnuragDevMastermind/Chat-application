import React, { useState, useEffect, useRef } from 'react'
import styles1 from './ContactSideMenu.module.css'

interface ContactSideMenuProp {
  isActive: boolean
  setIsActiveSidebar: (isActive: boolean) => void;
}

const ContactSideMenu: React.FC<ContactSideMenuProp> = ({ isActive, setIsActiveSidebar }) => {
  const messages = [
    {
      image: '/frame-10@2x.png',
      fullName: 'Elmer Laverty',
      time: '12m',
      message: 'Haha oh man 🔥',
      label1: 'Question',
      label2: 'Help wanted',
    },
    {
      image: '/frame-101@2x.png',
      fullName: 'Florencio Dorrance',
      time: '24m',
      message: 'woohoooo',
      label1: 'Question',
      label2: 'Some content',
    },
    {
      image: '/frame-102@2x.png',
      fullName: 'Anurag Sagar',
      time: '1h',
      message: "Haha that's terrifying 😂",
      label1: 'Bug',
      label2: 'Hacktoberfest',
    },
    {
      image: '/frame-103@2x.png',
      fullName: 'Titus Kitamura',
      time: '5h',
      message: 'omg, this is amazing',
      label1: 'Question',
      label2: 'Some content',
    },
    {
      image: '/frame-104@2x.png',
      fullName: 'Geoffrey Mott',
      time: '2d',
      message: 'aww 😍',
      label1: 'Request',
      label2: 'Request',
    },
  ]

  const toggleSidebar = () => {
    setIsActiveSidebar(!isActive);
  };

  return (
    <div className={`${styles1.contactsidemenu} ${isActive ? styles1.active : ''}`}>
      <div className={styles1.header}>
        <div className={styles1.contactbar}>
          <div className={styles1.arrowBack1Parent}>
            <img
              className={styles1.arrowBack1Icon}
              alt=""
              src="/arrow-back-1.svg"
              onClick={toggleSidebar} 
            />
            <div className={styles1.newChat}>New Chat</div>
          </div>
        </div>
        <div className={styles1.divider} />
      </div>
      <div className={styles1.contactgloballist}>
        <div className={styles1.contactlist}>
          <div className={styles1.contact}>
            <img className={styles1.imgIcon} alt="" src={messages[0].image} />
            <div className={styles1.contactdetail}>
              <div className={styles1.name}>
                <div className={styles1.elmerLaverty}>Elmer Laverty</div>
              </div>
              <div className={styles1.available}>Available</div>
            </div>
          </div>
          <div className={styles1.contact}>
            <img className={styles1.imgIcon} alt="" src={messages[1].image} />
            <div className={styles1.contactdetail}>
              <div className={styles1.name}>
                <div className={styles1.elmerLaverty}>Lavern Laboy</div>
              </div>
              <div className={styles1.available}>Busy</div>
            </div>
          </div>
          <div className={styles1.contact}>
            <img className={styles1.imgIcon} alt="" src={messages[2].image} />
            <div className={styles1.contactdetail}>
              <div className={styles1.name}>
                <div className={styles1.elmerLaverty}>Titus Kitamura</div>
              </div>
              <div className={styles1.available}>In a meeting</div>
            </div>
          </div>
          <div className={styles1.contact}>
            <img className={styles1.imgIcon} alt="" src={messages[3].image} />
            <div className={styles1.contactdetail}>
              <div className={styles1.name3}>
                <div className={styles1.elmerLaverty}>Geoffrey Mott</div>
                <div className={styles1.m}>2d</div>
              </div>
              <div className={styles1.atWork}>At work</div>
            </div>
          </div>
          <div className={styles1.contact}>
            <img className={styles1.imgIcon} alt="" src={messages[4].image} />
            <div className={styles1.contactdetail}>
              <div className={styles1.name3}>
                <div className={styles1.fullNameHere1}>Alfonzo Schuessler</div>
                <div className={styles1.m}>1m</div>
              </div>
              <div className={styles1.available}>Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSideMenu
