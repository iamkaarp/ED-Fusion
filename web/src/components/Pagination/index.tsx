import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import Icon from '@mdi/react'
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronTripleLeft,
  mdiChevronTripleRight,
} from '@mdi/js'

interface PaginationProps {
  currentPage: number
  lastPage: number
  view: string
}

const Pagination: FC<PaginationProps> = ({ currentPage, lastPage, view }) => {
  const [pages, setPages] = useState<number[]>([])

  const max = isMobile ? 2 : 4

  useEffect(() => {
    const tmpPages = []
    const maxSides = max
    const left = currentPage - maxSides
    const right = currentPage + maxSides > currentPage ? lastPage : currentPage + maxSides
    const minLeft = currentPage >= lastPage ? lastPage - 9 : left
    const maxRight = right >= 10 ? right + 1 : 10

    for (let i = currentPage - maxSides; i <= currentPage + maxSides; i++) {
      if (i < 1) {
        continue
      }

      if (i > lastPage) {
        continue
      }

      if (i >= minLeft && i <= maxRight) {
        tmpPages.push(i)
      }
    }
    setPages(tmpPages)
  }, [currentPage])

  const previous = () => {
    if (currentPage - 1 < 1) {
      return currentPage
    }
    return currentPage - 1
  }

  const next = () => {
    if (currentPage + 1 > lastPage) {
      return currentPage
    }
    return currentPage + 1
  }

  return (
    <>
      <nav className="flex justify-center w-full pb-4">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <Link
              to={`/${view}/1`}
              className="hidden px-3 py-2 ml-0 leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:rounded-l-lg md:block hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">First page</span>
              <Icon path={mdiChevronTripleLeft} size={'20px'} />
            </Link>
          </li>
          <li>
            <Link
              to={`/${view}/${previous()}`}
              className="block px-3 py-2 ml-0 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-l-lg md:rounded-none hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <Icon path={mdiChevronLeft} size={'20px'} />
            </Link>
          </li>
          {currentPage > 5 && (
            <>
              <li>
                <Link
                  to={'/${view}/1'}
                  className="hidden px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:block hover:bg-gray-700 hover:text-white"
                >
                  <span className="sr-only">Page 1</span>1
                </Link>
              </li>
              <li>
                <a className="hidden px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:block hover:bg-gray-700 hover:text-white">
                  ...
                </a>
              </li>
            </>
          )}
          {pages.map((page) => {
            if (page === currentPage) {
              return (
                <li key={page}>
                  <Link
                    to={`/${view}/${page}`}
                    className="block px-3 py-2 text-base font-bold leading-tight text-orange-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white"
                  >
                    <span className="sr-only">Page {page}</span>
                    {page}
                  </Link>
                </li>
              )
            }
            return (
              <li key={page}>
                <Link
                  to={`/${view}/${page}`}
                  className="block px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  <span className="sr-only">Page {page}</span>
                  {page}
                </Link>
              </li>
            )
          })}
          {lastPage - currentPage > 5 && (
            <>
              <li>
                <a className="hidden px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:block hover:bg-gray-700 hover:text-white">
                  ...
                </a>
              </li>
              <li>
                <Link
                  to={`/${view}/${lastPage}`}
                  className="hidden px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:block hover:bg-gray-700 hover:text-white"
                >
                  <span className="sr-only">Page {lastPage}</span>
                  {lastPage}
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to={`/${view}/${next()}`}
              className="block px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-r-lg md:rounded-none hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Next</span>
              <Icon path={mdiChevronRight} className="text-base" size={'20px'} />
            </Link>
          </li>
          <li>
            <Link
              to={`/${view}/${lastPage}`}
              className="hidden px-3 py-2 text-base leading-tight text-gray-400 bg-gray-800 border border-gray-700 md:rounded-r-lg md:block hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Last Page</span>
              <Icon path={mdiChevronTripleRight} className="text-base" size={'20px'} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
