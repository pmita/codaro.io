'use client'

import { roboto, poppins } from '../utils/fonts'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="px-8 md:px-6 md:xl-4 p-4 flex justify-between items-center bg-main-black text-main-white">
      <h1 className={`text-2xl ${poppins.className} bg-highlight-green p-4`}>
        Codaro<span className="text-secondary-black">.io</span>
      </h1>
      <ul className="flex justify-end items-center gap-x-4">
        <h4 className="border-solid border-4 border-highlight-green p-2 rounded-md">
          <Link href={'/pro'}>
            PRO
          </Link>
        </h4>
        <h4>
          <Link href={'/courses'}>
            courses
          </Link>
        </h4>
        <button>
          <Link href={'/login'} className="p-4 bg-main-white text-main-black">
            LOGIN
          </Link>
        </button>
      </ul>
    </nav>
  )
}

export default Navbar;