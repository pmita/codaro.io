"use client"

import Link from 'next/link'
import { roboto, poppins } from '../utils/fonts'
import { useDarkMode } from '../context/DarkModeContext';
import BackgroundCylinder from './SVGs/BackgroundCylinder';
import DarkModeCylinderSVG from './SVGs/DarkModeCylinderSVG';


export const LandingBanner = () => {
  const { darkMode } = useDarkMode();
  return(
    <div className={`${darkMode ? "dark" : ""} min-h-[90vh] flex justify-center items-center`}>
      <div className="relative isolate px-4 pt-14 lg:px-6">

        {/* ----- Background SVGs ----- */}
        <div className="absolute -rotate-45 bottom-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:bottom-10 -left-70 origin-bottom-left animate-rotateRight">
          {darkMode 
            ?<DarkModeCylinderSVG  width="288" height='428' fill="none"/>
            :<BackgroundCylinder  width="288" height='428' fill="none"/>
          }
        </div>
        <div className="absolute -rotate-20 -top-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 left-20 origin-bottom-right animate-rotateLeft">
          {darkMode 
            ?<DarkModeCylinderSVG  width="288" height='428' fill="none"/>
            :<BackgroundCylinder  width="288" height='428' fill="none"/>
          }
        </div>
        <div className="absolute -top-10 rotate-20 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 -right-20 origin-top-right animate-rotateLeft">
          {darkMode 
            ?<DarkModeCylinderSVG  width="288" height='428' fill="none"/>
            :<BackgroundCylinder  width="288" height='428' fill="none"/>
          }
        </div>

        {/* ----- CTA Banner ----- */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className={`text-4xl font-bold ${poppins.className} tracking-tight ${darkMode ? "text-main-white" : "text-main-purple"} sm:text-6xl`}>
              Data to enrich your online business
            </h1>
            <p className={`mt-6 text-lg ${roboto.className} ${darkMode ? "text-main-white" : "text-main-black"}leading-8 text-gray-600`}>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="primary-btn">
                <Link href={'/pro'}>
                  Get Started
                </Link>
              </button>
              <button className="secondary-btn">
                <Link href={'/courses'}>
                  Learn More →
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingBanner;