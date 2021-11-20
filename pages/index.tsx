import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import 'antd/dist/antd.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main>
      <header> 
        <h1 className="title">
          Home page
        </h1>
        <Link href="/login">
          <a style={{color: 'blue'}}>Login</a>
        </Link>
        </header>
   
      </main>

    </div>
  )
}

export default Home
