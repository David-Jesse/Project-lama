import {getPosts} from '@/lib/data'
import styles from './adminPosts.module.css'
import Image from 'next/image'
import { deletePost } from '@/lib/action'


const AdminPosts = async () => {

    const posts = await getPosts()

  return (
    <div className={styles.container}>
        <h1>Posts</h1>
        {posts.map((post) => (
            <div className={styles.post} key={post.id}>
                <div className={styles.detail}>
                    <Image src={post.img || "/noavatar.png"} alt="" width={50} height={50}/>
                    <span className={styles.title}>{post.title}</span>
                </div>
                <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id}/>
                    <button type='submit' className={styles.button}>Delete</button>
                </form>
            </div>
        ))}
    </div>
  )
}

export default AdminPosts