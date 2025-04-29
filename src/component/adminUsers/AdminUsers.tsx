"use server";
import { deleteUser } from '@/lib/action';
import styles from './adminUsers.module.css'
import { getUsers } from '@/lib/data'
import Image from 'next/image';


const AdminUsers = async () => {

  const users = await getUsers()
  return (
    <div className={styles.container}>
        <h1>Users</h1>
        {users.map((user) => (
          <div className={styles.user} key={user.id}>
            <div className={styles.detail}>
              <Image 
                src={user.img || "/noavatar.png"}
                alt=""
                width={50}
                height={50}
              />
              <span>{user.username}</span>
              {user.admin && <span className={styles.adminBadge}>(Admin)</span>}
            </div>
            {!user.isAdmin ? (
               <form action={deleteUser}>
               <input type="hidden" name="id" value={user.id} />
               <button className={styles.userButton}>Delete</button>
             </form>
            ): (
              <div className={styles.protectedUser}>Protected</div>
            )}
           
          </div>
        ))}
    </div>
  )
}

export default AdminUsers;