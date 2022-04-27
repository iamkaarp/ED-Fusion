import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './css/index.scss'
import './css/search.scss'
import logo from '../../assets/icons/logo.png'
import Search from './Search'

const NavBar: FC = () => {
  return (
    <>
      <nav className="fixed z-10 w-full top-0 border-gray-600 border-b px-2 sm:px-4 py-2.5 rounded bg-gray-800">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
              ED-Fusion
            </span>
          </Link>
          <div className="flex md:order-1 md:w-3/5">
            <Search />
            <button
              data-collapse-toggle="mobile-menu-3"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-400 rounded-lg md:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600"
              aria-controls="mobile-menu-3"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
            id="mobile-menu-3"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to="/systems"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                  aria-current="page"
                >
                  Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/stations"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Stations
                </Link>
              </li>
              <li>
                <Link
                  to="/factions"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Factions
                </Link>
              </li>
              <li>
                <Link
                  to="/market"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Market
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
