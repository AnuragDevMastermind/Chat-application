import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_ENDPOINT, LOGIN_ENDPOINT } from './App'
import styles from './Signup.module.css'
import MaterialTextField from './MaterialTextField'

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null)
  const numberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSignup(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      await signup(
        nameRef.current?.value,
        numberRef.current?.value,
        passwordRef.current?.value
      )
      navigate(HOME_ENDPOINT)
    } catch {
      console.log('Failed to create an account')
    }
  }

  return (
    <div className={styles.signupDekstopVerification2}>
      <div className={styles.signupDekstopVerification2Inner}>
        <div className={styles.frameParent}>
          <div className={styles.image1Parent}>
            <img className={styles.image1Icon} alt="" src="/app-icon.png" />
            <div className={styles.neochat}>Neochat</div>
          </div>
          <div className={styles.helpParent}>
            <div className={styles.help}>Help</div>
            <div className={styles.privacy}>Privacy</div>
            <div className={styles.privacy}>Terms</div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSignup}>
        <div className={styles.loginIntoYouAccountParent}>
          <div className={styles.loginIntoYou}>Signup into you account</div>
          <MaterialTextField
            icon={'/person.svg'}
            labelText={'Name'}
            type="text"
            inputRef={nameRef}
          />
          <MaterialTextField
            icon={'/phone.svg'}
            labelText={'Number'}
            type="tel"
            inputRef={numberRef}
          />
          <MaterialTextField
            icon={'/lock.svg'}
            labelText={'Password'}
            type="password"
            inputRef={passwordRef}
          />

          <button type="submit" className={styles.button}>
            <div className={styles.stateLayer4}>
              <b className={styles.labelText4}>Sign up</b>
            </div>
          </button>
          <div className={styles.alreadyAUserLoginParent}>
            <div className={styles.alreadyAUser}>Already a user login. </div>
            <Link to={LOGIN_ENDPOINT}>
              <div className={styles.login}>LOGIN</div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
