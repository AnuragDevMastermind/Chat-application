import { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_ENDPOINT, SIGNUP_ENDPOINT } from './App'
import MaterialTextField from './MaterialTextField'
import styles from './Login.module.css'

export default function Login() {
  const numberRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login } = useAuth()

  const navigate = useNavigate()

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      await login(numberRef.current?.value, passwordRef.current?.value)
      navigate(HOME_ENDPOINT)
    } catch {
      console.log('Failed to log in')
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
      <form onSubmit={handleLogin}>
        <div className={styles.loginIntoYouAccountParent}>
          <div className={styles.loginIntoYou}>Login into you account</div>

          <MaterialTextField
            icon={'/phone.svg'}
            labelText={'Number'}
            type='tel'
            inputRef={numberRef}
          />
          <MaterialTextField
            icon={'/lock.svg'}
            labelText={'Password'}
            type='password'
            inputRef={passwordRef}
          />

          <button type="submit" className={styles.button}>
            <div className={styles.stateLayer4}>
              <b className={styles.labelText4}>Login</b>
            </div>
          </button>
          <div className={styles.alreadyAUserLoginParent}>
            <div className={styles.alreadyAUser}>Don’t have an account.</div>
            <Link to={SIGNUP_ENDPOINT}>
              <div className={styles.login}>SIGNUP</div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
