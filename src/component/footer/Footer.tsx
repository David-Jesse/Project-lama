import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>David-Jesse</div>
      <div className={styles.text}>
        David-Jesse thoughts agency &copy; all rights reserved
      </div>
    </div>
  )
}

export default Footer