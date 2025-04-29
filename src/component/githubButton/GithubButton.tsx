import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from './githubButton.module.css';

export default function GithubSignInButton ({callbackUrl = "/"}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            setIsLoading(true);
            await signIn("github", {callbackUrl})
        } catch (error) {
            console.error("Github sign-in error:", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={styles.githubButton}
        >
            {isLoading ? (
                <div className={styles.spinner}/>
            ): (
            <svg className={styles.githubIcon} viewBox="0 0 24 24">
                <path
                    fill="#ffffff"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                />
            </svg>
            )}
            <span className={styles.buttonText}>
                {isLoading ? "Hang on..." : "Sign in with Github"}
            </span>
        </button>
    )
}