'use client'

import Link from 'next/link'
import { roboto, poppins } from '../utils/fonts'
// CONTEXT
import { useDarkMode } from '../context/DarkModeContext';
// SVGs
import DarkModeSVG from './SVGs/DarkModeSVG';
import LightModeSVG from './SVGs/LightModeSVG';

const Navbar = () => {
  // STATE
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className={`p-6 md:p-8 container flex justify-between items-center ${darkMode ? "dark" : ""}`}>
      <h1 className={`text-2xl p-4 ${poppins.className} ${darkMode ? "text-main-white" : "text-main-purple"} font-bold`}>
        Codaro.io
      </h1>
      <ul className="flex justify-end items-center gap-x-4 md:gap-x-8">
        {darkMode 
          ? <button onClick={toggleDarkMode} type="button">
              <LightModeSVG width="25" height="25" fill="#FFFFFF" onClick={toggleDarkMode} />
            </button>
          : <button onClick={toggleDarkMode} type="button">
              <DarkModeSVG width="25" height="25" fill="#1E1E1E" /> 
            </button>
        }
        <h4 className={`hover:scale-105 hover:text-main-purple transition-transform font-semibold`}>
          <Link href={'/pro'}>
            PRO
          </Link>
        </h4>
        <h4 className={`hover:scale-105 hover:text-main-purple transition-transform font-semibold`}>
          <Link href={'/courses'}>
            courses
          </Link>
        </h4>
        <button className={`primary-btn ${roboto.className} drop-shadow-[3px_3px_0_black] hover:drop-shadow-[0_0_7px_rgba(39,31,224,0.5)] transition-all duration-300`}>
          <Link href={'/login'}>
            LOGIN
          </Link>
        </button>
      </ul>
    </nav>
  )
}

export default Navbar;