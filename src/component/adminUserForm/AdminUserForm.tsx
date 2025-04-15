"use client"
import styles from './adminUserForm.module.css'
import { addUser } from '@/lib/action'
//import { useFormState } from 'react-dom'
import { useActionState } from 'react'

type FormState = {
  err?: string;
  success: boolean;
};

const initialState: FormState = {
  err: undefined,
  success: false
};


const AdminUserForm = () => {
  const [state, formAction] = useActionState(addUser, initialState)

  return (
    <div className={styles.container}>
      <h1>Add new User</h1>
      <form className={styles.details} action={formAction}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password" />
        <select name="isAdmin" >
          <option value="">Select role</option>
          <option value="false">User</option>
          <option value="true">Admin</option>
        </select>
        <button>Add User</button>
        {state && state.err}
      </form>
    </div>
  )
}

export default AdminUserForm