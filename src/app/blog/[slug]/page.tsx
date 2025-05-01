import styles from './singlePost.module.css';
import Image from 'next/image';
import { getPost } from '@/lib/data'
import {Suspense} from 'react'
import PostUser from '@/component/postuser/PostUser'
import { Metadata } from 'next';

// interface Params {
//   slug: string
// }

interface Post {
  title: string;
  desc: string;
}

// Fetching data with an Api
const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)

  if(!res.ok) {
    throw new Error('Something went wrong')
  }  
  return res.json();
}

// Generate Metadata for individual Post
export const generateMetadata = async ({params}: {params: Promise<{slug: string}>}): Promise<Metadata> => {
  const {slug} = await params;

  try {  
    const post: Post = await getPost(slug);    

    if (!post) {
      return {
        title: 'Post not found!',
        description: 'The requested post could not be found!'
      };
    }

    return {
      title: post.title,
      description: post.desc,
      openGraph: {
        title: post.title,
        description: post.desc,
        url: '/posts/${slug}',
        type: 'article'
      } 
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "error",
      description: "There was an error loading this post"
    }
  }

}

const SinglePostPage = async ({params}: {params: Promise<{slug: string}>}) => {

  const {slug} = await params
  console.log('slug:', slug)

  // Fetching data with an API
  const post = await getData(slug);
  
  // Fetching data without an API
  // const post = await getPost(slug);
  // console.log( 'Fetched post:', post)

  return (
    <div className={styles.container}>
    {post.img && 
      <div className={styles.imgContainer}>
        <Image 
          src={post.img}
          alt='single post image' 
          fill 
          className={styles.img}
        />
      </div>
    }
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId}/>
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(0, 10)}</span>
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