import Image from 'next/image';
import styles from './about.module.css'

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>What We Do</h2>
        <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better.</h1>
        <p className={styles.desc}>We create digital ideas that are bigger, bolder, braver and better.
          We believe in good ideas flexibility and precision. We pride ourselves with delivering
          world class consulting and finance solutions to our clients. We also offer a wide range of
          web and software development services.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Years of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Years of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image 
          src='/about.png'
          alt="About image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  
  )
}

export default AboutPage;