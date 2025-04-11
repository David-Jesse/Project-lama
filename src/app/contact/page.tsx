import styles from './contact.module.css'
import type { Metadata } from "next";
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Contact page",
  description: "Contact description",
};

const Contactpage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <Image src="/contact.png" alt="contact image" fill className={styles.img}/>
        </div>

        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
            <input type="text" placeholder="Name and Surname"/>
            <input type="text" placeholder="Email Address"/>
            <input type='text' placeholder="Phone Number (Optional)"/>
            <textarea 
                name="" 
                id=""
                cols={30}
                rows={10}
                placeholder='Message'
                ></textarea>
                <button>Send</button>
            </form>
        </div>
    </div>
  )
}

export default Contactpage