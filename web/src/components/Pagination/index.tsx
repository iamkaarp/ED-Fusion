import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
}

const Pagination: FC<PaginationProps> = ({ currentPage, lastPage }) => {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const tmpPages = []
    const maxSides = 4
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
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Link
            to={'/systems/1'}
            className="block py-2 px-3 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span className="sr-only">First page</span>
            <Icon path={mdiChevronTripleLeft} size={'20px'} />
          </Link>
        </li>
        <li>
          <Link
            to={`/systems/${previous()}`}
            className="block py-2 px-3 ml-0 leading-tight  border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <Icon path={mdiChevronLeft} size={'20px'} />
          </Link>
        </li>
        {currentPage > 5 && (
          <>
            <li>
              <Link
                to={'/systems/1'}
                className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <span className="sr-only">Page 1</span>1
              </Link>
            </li>
            <li>
              <a className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
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
                  to={`/systems/${page}`}
                  className="block text-base font-bold py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-orange-400 hover:bg-gray-700 hover:text-white"
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
                to={`/systems/${page}`}
                className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
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
              <a className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                ...
              </a>
            </li>
            <li>
              <Link
                to={`/systems/${lastPage}`}
                className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <span className="sr-only">Page {lastPage}</span>
                {lastPage}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to={`/systems/${next()}`}
            className="block text-base py-2 px-3 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span className="sr-only">Next</span>
            <Icon path={mdiChevronRight} className="text-base" size={'20px'} />
          </Link>
        </li>
        <li>
          <Link
            to={`/systems/${lastPage}`}
            className="block text-base py-2 px-3 leading-tight rounded-r-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span className="sr-only">Last Page</span>
            <Icon path={mdiChevronTripleRight} className="text-base" size={'20px'} />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
