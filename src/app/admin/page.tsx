import AdminPosts from '@/component/adminPosts/AdminPosts'
import styles from './admin.module.css'
import { Suspense } from 'react'
import AdminPostForm from '@/component/adminPostForm/AdminPostForm'
import AdminUsers from '@/component/adminUsers/AdminUsers'
import AdminUserForm from '@/component/adminUserForm/AdminUserForm'
import { auth } from '@/lib/auth'

const Admin = async () => {

  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts/>
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId={session?.user.id || ''}/>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers/>
          </Suspense>
        </div>
        <div className={styles.col}>
        <AdminUserForm/>
        </div>
      </div>
    </div>
  )
}

export default Admin