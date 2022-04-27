import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import DateFormat from '../../helpers/DateFormat'

import ISystemStations from './interfaces/ISystemStations'
import IStation from '../../interfaces/IStation'

import Loader from '../Loader/index'

const Stations: FC<ISystemStations> = ({ stations, onSort, column, direction, loading }) => {
  return (
    <div className="relative overflow-x-auto min-h-128 shadow-md sm:rounded-lg mt-4">
      {loading && (
        <div
          className="absolute flex justify-center items-center w-full h-full"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <Loader />
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('name', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Station</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('type', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Type</div>
            </th>
            <th scope="col" className="px-6 py-3 hover:text-orange-400">
              <div className="flex items-center">Government</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('max_landing_pad_size', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Landingpad Size</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('distance_from_star', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Distance From Star</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('updated_at', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Updated At</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station: IStation) => {
            return (
              <tr
                key={station.id}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
              >
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  <Link to={`/station/${station.name}`} className="hover:text-orange-400">
                    {station.name}
                  </Link>
                </th>
                <td className="px-6 py-4">{station.type.match(/[A-Z][a-z]+/g)?.join(' ')}</td>
                <td className="px-6 py-4">{station.government?.name}</td>
                <td className="px-6 py-4">
                  {station.max_landing_pad_size !== '' ? station.max_landing_pad_size : '-'}
                </td>
                <td className="px-6 py-4">{station.distance_from_star} Ls</td>
                <td className="px-6 py-4">{DateFormat.fromNow(station.updated_at)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Stations
