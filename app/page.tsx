import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Next.js</h1>
      <h4 className="text-gray-500 py-8">With Tailwind CSS</h4>
    </main>
  )
}
