"use client"

import {handleGithubLogin} from '@/lib/action'
import { handleGoogleLogin } from '@/lib/action'
import styles from './login.module.css'
import LoginForm from '@/component/loginForm/LoginForm'
import GoogleSignInButton from '@/component/googleLoginbutton/GoogleSignInButton'
import GithubSignInButton from '@/component/githubButton/GithubButton'

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <form action={handleGithubLogin}>
            <GithubSignInButton />
          </form>
          <form action={handleGoogleLogin}>
            <GoogleSignInButton />
          </form>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage