"use client"
import { registerUser } from '@/lib/action'
import styles from './register.module.css'
import { useState } from 'react'

const Registerpage = () => {
  const [message, setMessage] = useState<{error?: string; success?: string} | null>(null)

  const handleRegister = async (formData: FormData) => {
    const result = await registerUser(formData);

    if (result.error) {
      setMessage({error: result.error})
    } else if (result.success) {
      setMessage({success: result.success})
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          {message?.error && (
            <div className={styles.error}>{message.error}</div>
          )}
          {message?.success && (
            <div className={styles.success}>{message.success}</div>
          )}
            <form className={styles.form} action={handleRegister}>
                <input type="text" placeholder="Username" name="username"  required/>
                <input type="email" placeholder="Email" name="email"  required/>
                <input type="password" placeholder="Password" name="password" required/>
                <input type="password" placeholder="Confirm password" name="passwordRepeat" required/>
                <button type='submit'>Submit</button>
            </form>
        </div>
        
    </div>
  )
}

export default Registerpage