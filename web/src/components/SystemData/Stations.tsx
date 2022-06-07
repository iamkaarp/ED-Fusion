import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import DateFormat from '../../helpers/DateFormat'
import getStationTypes from '../../helpers/StationTypes'

import ISystemStations from './interfaces/ISystemStations'
import IStation from '../../interfaces/IStation'

import Table from '../Table/index'

const Stations: FC<ISystemStations> = ({ stations, loading, column, direction, onSort }) => {
  const th = [
    {
      name: 'Station',
      sort: 'name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Type',
      sort: 'type',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Landingpad',
      sort: 'max_landing_pad_size',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Government',
      sort: 'max_landing_pad_size',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Distance from arrival',
      sort: 'distance_from_star',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Updated',
      sort: 'updated_at',
      sortable: true,
      mobile: true,
    },
  ]

  return (
    <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
      <Table th={th} loading={loading} onSort={onSort} column={column} direction={direction}>
        {stations.map((station: IStation) => {
          return (
            <tr key={station.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
              <th
                scope="row"
                className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
              >
                <Link to={`/station/${station.name}`} className="hover:text-orange-400">
                  {station.name}
                </Link>
              </th>
              <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                {getStationTypes(station.type)}
              </td>
              <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                {station.max_landing_pad_size !== '' ? station.max_landing_pad_size : '-'}
              </td>
              <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                {station.government?.name}
              </td>
              <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                {station.distance_from_star.toLocaleString()} Ls
              </td>
              <td className="px-1.5 py-2 md:px-6 md:py-4">
                {DateFormat.fromNow(station.updated_at)}
              </td>
            </tr>
          )
        })}
      </Table>
    </div>
  )
}

export default Stations
