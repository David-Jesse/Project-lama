import styles from './singlePost.module.css';
import Image from 'next/image';
import { getPost } from '@/lib/data';


interface Params {
  slug: string
}

// interface Post  {
//     userid: number;
//     id: number;
//     // title: string;
//     desc: string; 
//     img?: string;
// }


// const getData = async (slug: string): Promise<Post> => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)

//   if(!res.ok) {
//     throw new Error('Something went wrong')
//   }

//   return res.json();
// }

const SinglePostPage = async ({ params }: {params: Params}) => {

  const {slug} = params
  console.log('slug:', slug)
  
  const post = await getPost(slug)
  console.log( 'Fetched post:', post)

  return (
    <div className={styles.container}>
    {/* { post.img && 
      <div className={styles.imgContainer}>
        <Image 
          src={post.img}
          alt='single post image' 
          fill 
          className={styles.img}
          />
      </div>
    } */}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image 
            className={styles.avatar}
            src='https://images.pexels.com/photos/31033691/pexels-photo-31033691/free-photo-of-varanda-urbana-encantadora-com-vegetacao-exuberante.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt='Avatar image'
            width={50}
            height={50}
          />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2025</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.desc}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage;