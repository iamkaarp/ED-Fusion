import React, { FC, useState, useEffect } from 'react'

import EDFusion from '../../apis/EDFusion'
import ISystem from '../../interfaces/ISystem'

import Loader from '../Loader'

interface ModalProps {
  isOpen: any
}

interface LoadingObj {
  systems: boolean
  stations: boolean
  factions: boolean
}

const Search: FC<ModalProps> = ({ isOpen }) => {
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<LoadingObj>({
    systems: true,
    stations: false,
    factions: false,
  })
  const [systems, setSystems] = useState<ISystem[]>([])
  const searchSystems = async (query: string) => {
    setLoading({ ...loading, systems: true })
    const response = await EDFusion.systems.search(query)
    setSystems(response)
    setLoading({ ...loading, systems: false })
  }

  useEffect(() => {
    if (query.length >= 2) {
      searchSystems(query)
    } else {
      setSystems([])
    }
  }, [query])

  return (
    isOpen && (
      <div className="w-1/2 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
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
          <input
            type="text"
            id="email-adress-icon"
            className="border rounded-lg search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading.systems ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader />
          </div>
        ) : (
          <>
            {systems.map((system) => {
              return (
                <div className="flex items-center p-2" key={system.id}>
                  <div className="w-1/2">
                    <p className="text-gray-500">{system.name}</p>
                  </div>
                  <div className="w-1/2" />
                </div>
              )
            })}
          </>
        )}
      </div>
    )
  )
}

export default Search
