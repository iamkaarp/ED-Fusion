import React, { FC, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import FDev from '../../apis/FDev'
import User from '../../apis/User'

import './css/index.scss'
import './css/search.scss'
import logo from '../../assets/icons/logo.webp'
import Search from './Search'

import portraits from '../../helpers/Portraits'

const NavBar: FC = () => {
  const [menu, setMenu] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)
  const user = useSelector((state: any) => state.user)
  const fdevPersist = useSelector((state: any) => state.fdev)
  const [url, setUrl] = useState<string>('')

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowUser(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
  }

  const setOpenModal = (e: React.MouseEvent, modal: string) => {
    e.preventDefault()
    dispatch({ type: 'modal/openModal', payload: { modal: modal } })
    setShowUser(false)
  }

  const signOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    await User.signOut()
    dispatch({ type: 'user/signout' })
  }

  const fetchURL = async () => {
    const res = await FDev.url()
    setUrl(res.url)
    dispatch({ type: 'fdev/setVerifier', payload: res.verifier })
  }

  useEffect(() => {
    fetchURL()
  }, [])

  useOutsideAlerter(wrapperRef)

  return (
    <>
      <nav className="fixed w-full px-2 sm:px-4 border-gray-600 border-b py-2.5 bg-gray-800 z-50">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
              ED-Fusion
            </span>
          </Link>
          <div className="hidden w-2/6 md:flex md:order-1">
            <Search />
          </div>
          <div className="flex items-center md:order-3">
            <div ref={wrapperRef} className="relative flex items-center ml-4 user-menu-wrapper">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0"
                id="user-menu-button"
                aria-expanded="false"
                onClick={() => setShowUser(!showUser)}
                data-dropdown-toggle="dropdown"
              >
                <span className="sr-only">Open user menu</span>
                <div
                  className="w-8 h-8 bg-top bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(${
                      user.token ? portraits[user.profile.image] : portraits.elite
                    })`,
                  }}
                />
              </button>
              <div
                className={`${
                  showUser ? '' : 'hidden'
                } absolute z-50 w-44 right-0 my-4 top-6 text-base list-none bg-gray-700 divide-y divide-gray-600 rounded shadow`}
                id="dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-white">
                    {user.token ? user.name : 'Elite'}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="dropdown">
                  <li>
                    <a
                      onClick={(e) => setOpenModal(e, 'ref')}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                    >
                      Set Current Location
                    </a>
                  </li>
                  {user.token ? (
                    <>
                      {!fdevPersist.connected && process.env.NODE_ENV !== 'production' && (
                        <li>
                          <a
                            href={url}
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                          >
                            Connect with Frontier
                          </a>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={(e) => signOut(e)}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a
                          onClick={(e) => setOpenModal(e, 'signin')}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Sign in
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e) => setOpenModal(e, 'signup')}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Sign up
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg md:hidden focus:outline-none hover:bg-gray-700"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setMenu(!menu)}
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
            style={{ zIndex: '9999' }}
            className={`md:flex p-2 top-14 bg-gray-800 left-0 right-0 items-center w-full justify-between md:w-auto md:order-2 ${
              menu ? '' : 'hidden'
            } `}
          >
            <div onClick={() => setMenu(false)} className="flex flex-col my-4 md:hidden">
              <Search />
            </div>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/systems"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                  aria-current="page"
                >
                  Systems
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/stations"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Stations
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/factions"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Factions
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/bodies"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Bodies
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/market"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Market
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/shipyard"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Shipyard
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/outfitting"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Outfitting
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenu(false)}
                  to="/map"
                  className="block py-2 pl-3 pr-4 text-gray-400 border-b border-gray-700 md:border-0 md:p-0 md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Map
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
