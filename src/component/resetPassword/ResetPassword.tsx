"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import { useSearchParams } from "next/navigation"
import styles from "./resetPassword.module.css"


export default function ResetPassword () {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] =  useState("")
    const [isValidToken, setIsValidToken] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const router = useRouter();
    const searchParamns = useSearchParams()

    useEffect(() => {
        // Get token from Url
        const urlToken = searchParamns.get("token")
        if (urlToken) {
            setToken(urlToken);
            validateToken(urlToken);
        } else {
            setError("Invalid password reset link")
        }
        
    
    }, [searchParamns])

    const validateToken = async (token: string) => {
        try {
            const response = await fetch("/api/auth/validate-reset-token", {
                method: 'POST',
                headers: {
                    "Conteent-Type": "application/json",
                },
                body: JSON.stringify({token}),
            });

            if (!response.ok) {
                setError("This reset link is invalid or has expired");
                setIsValidToken(false)
            } else {
                setIsValidToken(true)
            }
        } catch (err) {
            console.error("Error validating token:", err);
            setError("Unable to validate reset link");
            setIsValidToken(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset errors
        setError("");

        // Validate passwords
        if(password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to reset password");
            }

            setSuccess(true);

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (error && !isValidToken) {
        return (
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <div className={styles.errorState}>
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
                            className={styles.errorIcon}
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h2>Invalid Reset Link</h2>
                        <p>{error}</p>
                        <Link href="/forgot-password" className={styles.resetButton}>
                            Request a new reset link
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Reset Your Password</h1>

                {!success ? (
                    <>
                        <p className={styles.description}>
                            Create a new password for your account
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>
                                    New Password 
                                </label>
                                <input 
                                    type="password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    className={styles.input}
                                    minLength={8}
                                    />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="confirmPassword" className={styles.label}>
                                    Confirm Password 
                                </label>
                                <input 
                                    type="password" 
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                    minLength={8}
                                    className={styles.input}
                                />
                            </div>

                            {error && <div className={styles.error}> {error}</div>}

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Reset Password"}
                            </button>
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
                        <h2>Password Updated!</h2>
                        <p>Your password has been updated successfully</p>
                        <p className={styles.redirectNote}>
                            Redirecting to login page...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}