import {useState, FormEvent, ChangeEvent} from 'react';
import styles from '../../styles/auth.module.css';

interface ForgotPasswordFormProps {
    onSubmit: (email: string) => Promise<void>;
    onSuccess: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({onSubmit, onSuccess}) => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await onSubmit(email);
            onSuccess(email);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occured");
        } finally {
            setIsLoading(false);
        }
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.label}>
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    //autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.input}
                    placeholder="Enter your email"
                />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
                type="submit"
                disabled={isLoading || !email}
                className={styles.button}
            >
                {isLoading ? "Sendding..." : "Send Reset Link"}
            </button>
        </form>
    )
} 

export default ForgotPasswordForm;