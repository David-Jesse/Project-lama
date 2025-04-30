import styles from './postuser.module.css';
import { getUser } from '@/lib/data';
import Image from 'next/image'


// FETCH DATA FROM API
// const getData = async (userId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
// }

const PostUser = async ({userId}: { userId: string }) => {

    // FETCH DATA WITH API  
    const user = await getUser(userId)

  return (
    <div className={styles.container}>
      <Image 
          className={styles.avatar}
          src={ user?.img ? user.img : '/noavatar.png'}
          alt='Avatar image'
          width={50}
          height={50}
        />
        <div className={styles.texts}>
          <span className={styles.title}>Author</span>
          <span className={styles.username}>{user?.username}</span>
        </div>
    </div>
  )
}

export default PostUser