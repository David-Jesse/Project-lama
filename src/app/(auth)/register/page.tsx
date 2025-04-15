"use client"
import styles from './register.module.css'
import RegisterForm from '@/component/registerForm/registerForm'

const Registerpage = () => {
  //const [message, setMessage] = useState<{error?: string; success?: string} | null>(null)

  // const handleRegister = async (formData: FormData) => {
  //   const result = await registerUser(formData);

  //   if (result.error) {
  //     setMessage({error: result.error})
  //   } else if (result.success) {
  //     setMessage({success: result.success})
  //   }
  // }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* {message?.error && (
            <div className={styles.error}>{message.error}</div>
          )}
          {message?.success && (
            <div className={styles.success}>{message.success}</div>
          )} */}
          <RegisterForm />
          
        </div>
        
    </div>
  )
}

export default Registerpage