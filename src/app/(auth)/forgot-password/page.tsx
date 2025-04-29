"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import styles from './forgotPassword.module.css'

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({email}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }
      
      setSuccess(true);
    } catch(err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Reset Password</h1>

        {!success ? (
          <>
            <p className={styles.description}>
              Enter your email address and we&apos'll send you a link to reset your password 
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={styles.input}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              <div className={styles.links}>
                <Link href='/login'>
                  Return to login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={styles.successIcon}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h2>Check your email</h2>
            <p>
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <p className={styles.emailNote}>
              If you don&apos;t see the email, check your spam folder.
            </p>
            <button
              onClick={() => router.push('./login')}
              className={styles.backButton}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 