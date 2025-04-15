"use client"

import styles from './loginForm.module.css'
import { login } from '@/lib/action'
import React from 'react';
import {useActionState} from 'react'
import Link from 'next/link'


const LoginForm = () => {
    const [state, formAction] = useActionState(login, undefined)

  return (
    <form className={styles.form} action={formAction}>
        <input type="text" placeholder="Username" name="username"  required/>
        <input type="password" placeholder="Password" name="password" required/>
        <button type="submit">Login</button>
        {state}
        <Link href='/register'>
            {"Don't have an account?"} <b>Register</b>
        </Link>
    </form>
  )
}

export default LoginForm;