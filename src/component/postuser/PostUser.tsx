import styles from './postUser.module.css';
import { getUser } from '@/lib/data';

// FETCH DATA FROM API
// const getData = async (userId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
// }

const PostUser = async ({userId}: { userId: string }) => {

    // FETCH DATA WITH API
    const user = await getUser(userId)
  return (
    <div className={styles.container}>
        <span className={styles.title}>{user?.id}</span>
        <span className={styles.username}>{user?.name}</span>
    </div>
  )
}

export default PostUser