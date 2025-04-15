"use client";

import styles from './adminPostForm.module.css'
import { useActionState } from 'react';
import { addPost } from '@/lib/action'
//import { useFormState } from 'react-dom'

const AdminPostForm = ({userId}: {userId: string}) => {
  const [state, formAction] = useActionState(addPost, undefined)

  return (
    <form className={styles.container} action={formAction}>
      <h1>Add New Post</h1>
      <input type="hidden" name='userId' value={userId}/>
      <input type="text" name="title" placeholder='Title' minLength={3} required/>
      <input type="text" name="slug" placeholder="slug" required />
      <input type="text" name="img" placeholder="img" />
      <textarea name="desc" placeholder="desc" rows={10} required minLength={10}/>
      <button>Add Post</button>
      {state && state.error}
    </form>
  )
}

export default AdminPostForm