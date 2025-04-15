"use client"
import styles from './registerForm.module.css'
import { registerUser } from '@/lib/action'
import { useFormState } from 'react-dom'
import React from 'react'
import {useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



const RegisterForm = () => {
    const [state, formAction] = useFormState(registerUser, undefined)

    const router = useRouter()

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state?.success && router.push('/login')
    }, [state?.success, router])

  return (
    <form className={styles.form} action={formAction}>
        <input type="text" placeholder="Username" name="username"  required/>
        <input type="email" placeholder="Email" name="email"  required/>
        <input type="password" placeholder="Password" name="password" required/>
        <input type="password" placeholder="Confirm password" name="passwordRepeat" required/>
        <button type='submit'>Submit</button>
        {state?.error}
        <Link href='/login'>
            Have an account? <b>Login</b>
        </Link>
    </form>
  )
}

export default RegisterForm