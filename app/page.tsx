import { Roboto, Poppins } from 'next/font/google'
import styles from './page.module.css'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic']
})
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic']
})

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Next.js</h1>
      <h4 className="text-gray-500 py-8 bg-main-black">With Tailwind CSS</h4>
    </main>
  )
}
