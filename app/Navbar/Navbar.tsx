'use client'

import { roboto, poppins } from '../utils/fonts'

const Navbar = () => {
  return (
    <nav className="mx-8 md:mx-6 md:xl-4 my-4 flex justify-between items-center">
      <h1 className={`text-2xl ${roboto.className} text-main-white bg-main-black p-4`}>
        Codaro<span className="text-highlight-green">.io</span>
      </h1>
      <ul>
        <h4>Test</h4>
      </ul>
    </nav>
  )
}

export default Navbar;