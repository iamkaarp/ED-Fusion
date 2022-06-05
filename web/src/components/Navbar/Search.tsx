import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import './css/search.scss'

const Search: FC = () => {
  const dispatch = useDispatch()

  const handleFocus = () => {
    dispatch({ type: 'modal/openModal', payload: { modal: 'search' } })
  }

  /*const handleBlur = () => {
    setClasses(['border', 'rounded-lg'])
    setShowResults(false)
  }*/

  return (
    <>
      <div className="relative md:mr-0 md:block md:w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 items-center hidden pr-3 text-sm italic text-gray-500 pointer-events-none md:flex">
            Ctrl + K
          </div>
          <input
            type="text"
            className="border rounded-lg search"
            onClick={handleFocus}
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </div>
    </>
  )
}

export default Search
