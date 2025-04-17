"use client"

import {handleGithubLogin} from '@/lib/action'
import { handleGoogleLogin } from '@/lib/action'
import styles from './login.module.css'
import LoginForm from '@/component/loginForm/LoginForm'

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <form action={handleGithubLogin}>
            <button className={styles.githubButton}>Login with Github</button>
          </form>
          <form action={handleGoogleLogin}>
            <button className={styles.googleButton}>Login with Google</button>
          </form>
        </div>
       

        <LoginForm />

        {/* {message?.error && (
          <div className={styles.error}>{message.error}</div>
        )}
          {message?.success && (
          <div className={styles.success}>{message.success}</div>
        )} */}
      </div>
    </div>
  )
}

export default LoginPage