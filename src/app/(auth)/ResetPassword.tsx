import {useState, FormEvent, ChangeEvent} from 'react';
import styles from '../../styles/auth.module.css'

interface ResetPasswordFormProps {
    token: string;
    onSubmit: (token: string, password: string) => Promise<void>
    onSuccess: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({token, onSubmit, onSuccess}) => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match')
                return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await onSubmit(token, password);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occured")
        } finally {
            setIsLoading(false);
        }

    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="password">
                    New Password
                </label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    autoComplete='new password'
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    placeholder='Enter new password'
                    minLength={8}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password 
                </label>
                <input 
                    type="password" 
                    id='confirmPassword'
                    name='confirmPassword'
                    autoComplete='new-password'
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder='Confirm new Password'
                    className={styles.input}
                    minLength={8}
                />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button 
                type='submit'
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                className={styles.button}
            >
                {isLoading ? "Working Magic..." : "Reset Password"}
            </button>
        </form>
    )
}

export default ResetPasswordForm;