import { roboto, poppins } from './utils/fonts'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Next.js</h1>
      <h4 className="text-gray-500 py-8 bg-main-black">With Tailwind CSS</h4>
    </main>
  )
}
