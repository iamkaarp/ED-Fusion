import React, { FC, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import System from '../../apis/System'
import Station from '../../apis/Station'
import ISystem from '../../interfaces/ISystem'
import IStation from '../../interfaces/IStation'

import DateFormat from '../../helpers/DateFormat'
import getStationType from '../../helpers/StationTypes'

import ModalProps from './interfaces/ModalProps'

interface LoadingObj {
  systems: boolean
  stations: boolean
  factions: boolean
  shipyard: boolean
  outfitting: boolean
  market: boolean
}

const Search: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<LoadingObj>({
    systems: false,
    stations: false,
    factions: false,
    shipyard: false,
    outfitting: false,
    market: false,
  })
  const [systems, setSystems] = useState<ISystem[]>([])
  const [stations, setStations] = useState<IStation[]>([])

  const searchSystems = async (query: string) => {
    setLoading({ ...loading, systems: true })
    const response = await System.find(query)
    setSystems(response)
    setLoading({ ...loading, systems: false })
  }

  const searchStations = async (query: string) => {
    setLoading({ ...loading, stations: true })
    const response = await Station.find(query)
    setStations(response)
    setLoading({ ...loading, stations: false })
  }

  useEffect(() => {
    if (query.length >= 2) {
      searchSystems(query)
      searchStations(query)
    } else {
      setSystems([])
      setStations([])
    }
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setStations([])
      setSystems([])
      const elems: HTMLElement[] = Array.from(document.getElementsByTagName('input'))
      elems.forEach((elem: HTMLElement) => {
        elem.blur()
      })
      const search: HTMLElement = document.getElementById('searchInput')!
      setTimeout(() => search.focus(), 0)
    }
  }, [isOpen])

  return (
    isOpen && (
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow md:p-6 md:w-1/2"
      >
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
            id="searchInput"
            className="border rounded-lg search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="mt-4 overflow-auto search-content">
          <>
            {systems.length > 0 && (
              <div className="w-full">
                <span className="font-bold text-gray-400 text-md">Systems</span>
                <table className="w-full mt-2 text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                      <th className="px-1.5 py-2 md:px-3 md:py-1.5">Name</th>
                      <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        Population
                      </th>
                      <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        Economy
                      </th>
                      <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        Allegiance
                      </th>
                      <th className="px-1.5 py-2 md:px-3 md:py-1.5">Distance Sol</th>
                      <th className="px-1.5 py-2 md:px-3 md:py-1.5">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systems.map((system: ISystem) => (
                      <tr
                        key={system.id}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="md:px-3 md:py-1.5 font-medium text-white whitespace-nowrap"
                        >
                          <Link
                            onClick={closeModal}
                            to={`/system/${system.name}`}
                            className="cursor-pointer hover:text-orange-400"
                          >
                            {system.name}
                          </Link>
                        </th>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                          {system.population.toLocaleString()}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                          {system.primaryEconomy.name}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                          {system.allegiance.name}
                        </td>
                        <td className="px-1.5 py-2 md:px-3 md:py-1.5">
                          {system.distance.toLocaleString()} Ly
                        </td>
                        <td className="ppx-1.5 py-2 md:px-3 md:py-1.5">
                          {DateFormat.fromNow(system.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>

          {stations.length > 0 && (
            <div className="w-full mt-3">
              <span className="font-bold text-gray-400 text-md">Stations</span>
              <table className="w-full mt-3 text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th className="px-1.5 py-2 md:px-3 md:py-1.5">Name</th>
                    <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">System</th>
                    <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">Type</th>
                    <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">Pad size</th>
                    <th className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                      Distance Arrival
                    </th>
                    <th className="px-1.5 py-2 md:px-3 md:py-1.5">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station: IStation) => (
                    <tr
                      key={station.id}
                      className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-1.5 py-2 md:px-3 md:py-1.5 font-medium text-white whitespace-nowrap"
                      >
                        <Link
                          onClick={closeModal}
                          to={`/station/${station.name}`}
                          className="cursor-pointer hover:text-orange-400"
                        >
                          {station.name}
                        </Link>
                      </th>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        {station.system ? (
                          <Link
                            onClick={closeModal}
                            to={`/system/${station.system.name}`}
                            className="cursor-pointer hover:text-orange-400"
                          >
                            {station.system.name}
                          </Link>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        {getStationType(station.type)}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        {station.max_landing_pad_size}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-3 md:py-1.5">
                        {station.distance_from_star.toLocaleString()} Ls
                      </td>
                      <td className="px-1.5 py-2 md:px-3 md:py-1.5">
                        {DateFormat.fromNow(station.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Search
