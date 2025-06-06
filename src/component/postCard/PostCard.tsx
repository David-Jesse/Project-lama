import styles from './postcard.module.css';
import Image from 'next/image';
import Link from 'next/link';
//import { getPosts } from '@/lib/data';


interface PostsProps  {
  post: {
    userid: number;
    id: number;
    title: string;
    body: string; 
    img: string;
    slug: string;
    createdAt: Date | string;
  }
}

const PostCard = ({post}: PostsProps) => {

  const postDate = new Date(post.createdAt); 

  const formattedDate = postDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return (
    <div className={styles.container}>
        <div className={styles.top}>
          {post.img && <div className={styles.imgContainer}>
                <Image src={post.img} alt='' fill className={styles.img}/>
            </div>}
            <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.desc}>{post.body}</p>
            <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
        </div>
    </div>
  )
}

export default PostCard;