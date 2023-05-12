import Link from "next/link";
import { useState } from "react";


export default function Navbar() {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" onClick={() => setMenuOpen(prev => !prev)} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              {
                menuOpen
                ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
              }
            </button>
          </div>

          {/* PC버젼 메뉴 */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 rounded-md px-3 py-2 text-sm font-medium">단어퀴즈</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 모바일버젼 메뉴 */}
      {
        menuOpen &&
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/" onClick={() => setMenuOpen(prev => !prev)} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">단어퀴즈</Link>
          </div>
        </div>
      }
    </nav>
  );
}
