import styles from './blog.module.css';
import PostCard from '@/component/postCard/PostCard';
import { getPosts } from '@/lib/data';

// FETCHING DATA FROM AN API
// const getData = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')

//   if(!res.ok) {
//     throw new Error('Something went wrong')
//   }

//   return res.json();
// }

// interface PostsProps  {
//   post: {
//     userid: number;
//     id: number;
//     title: string;
//     body: string; 
//   }
// }

const Blog = async () => {
  // const posts: PostsProps['post'][] = await getData()
  
  // FETCHING DATA FROM MOCK DATA BASE
  const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post}/>
        </div>
      ))}
     
    </div>
  )
}

export default Blog;