"use client"

import {handleGithubLogin} from '@/lib/action'
import styles from './login.module.css'
import LoginForm from '@/component/loginForm/LoginForm'

const LoginPage = () => {
  //const [message, setMessage] = useState<{error?: string; success?: string} | null>(null)

  // const handleLogin = async (formData: FormData) => {
  //   try {
  //     const result = await login(formData)
  //     if (result) {
  //       setMessage(result)
  //     } else {
  //       setMessage({ error: 'An unexpected error occurred' })
  //     }

  //   } catch (err) {
  //     console.log(err)
  //     setMessage({error: 'An unexpected error occurred'})
  //   }
  // }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.githubButton}>Login with Github</button>
        </form>

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