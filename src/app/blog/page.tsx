import styles from './blog.module.css';
import PostCard from '@/component/postCard/PostCard';
//import { getPosts } from '@/lib/data';

// FETCHING DATA FROM AN API
const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog', {next: {revalidate: 3600}})

  if(!res.ok) {
    throw new Error('Something went wrong')
  }

  return res.json();
}

interface PostsProps  {
  post: {
    userid: number;
    id: number;
    title: string;
    body: string; 
    img: string
    slug: string
  }
}

const Blog = async () => {
  const posts: PostsProps['post'][] = await getData()
  
  // FETCHING DATA FROM MOCK DATA BASE
  // const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map((post, id) => (
        <div className={styles.post} key={post.id || id}>
          <PostCard post={post}/>
        </div>
      ))}
     
    </div>
  )
}

export default Blog;