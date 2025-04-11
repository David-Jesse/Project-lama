"use client"
import {handleGithubLogin, login} from '@/lib/action'
import {useState} from 'react'
import styles from './login.module.css'

const LoginPage = () => {
  const [message, setMessage] = useState<{error?: string; success?: string} | null>(null)

  const handleLogin = async (formData: FormData) => {
    try {
      const result = await login(formData)
      if (result) {
        setMessage(result)
      } else {
        setMessage({ error: 'An unexpected error occurred' })
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage({error: 'An unexpected error occurred'})
    }
  }
  return (
    <div className={styles.container}>
      <form action={handleGithubLogin} className={styles.githubForm}>
        <button className={styles.githubButton}>Login with Github</button>
      </form>

      <div className={styles.divider}>OR</div>

      <form action={handleLogin}>
        <input type="text" placeholder="username" name="username"/>
        <input type="text" placeholder="password" name="password"/>
        <button>Login with Credentials</button>
      </form>
    </div>
  )
}

export default LoginPage