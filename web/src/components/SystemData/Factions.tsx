import React, { Fragment, FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiChevronUp } from '@mdi/js'

import DateFormat from '../../helpers/DateFormat'

import ISystemFactions from './interfaces/ISystemFactions'

import Loader from '../Loader/index'
import IStation from '../../interfaces/IStation'
import IFactions from '../../interfaces/IFactions'

const Factions: FC<ISystemFactions> = ({
  factions,
  onSort,
  column,
  direction,
  loading,
  stations,
}) => {
  const [open, setOpen] = useState<any[]>([])

  const openFactionInfo = (id: number) => {
    const row = document.getElementById(`faction-row-${id}`)
    row?.classList.toggle('hidden')
    if (open.includes(id)) {
      setOpen(open.filter((item: number) => item !== id))
      return
    }
    setOpen([...open, id])
  }
  const filterStations = (faction: IFactions): IStation[] => {
    return stations.filter(
      (station: IStation) =>
        station.faction && station.faction.faction.name === faction.faction.name
    )
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
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
              <div className="flex items-center">Faction</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('happiness', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Happiness</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('alignment.name', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Alignment</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('government.name', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">Government</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:text-orange-400"
              onClick={() => {
                onSort('state', direction === 'asc' ? 'desc' : 'asc')
              }}
            >
              <div className="flex items-center">State</div>
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
            <th scope="col" className="px-6 py-3 cursor-pointer hover:text-orange-400" />
          </tr>
        </thead>
        <tbody>
          {factions.map((faction: any) => {
            return (
              <Fragment key={faction.id}>
                <tr
                  onClick={() => {
                    openFactionInfo(faction.id)
                  }}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    <Link to={`/station/${faction.faction.name}`} className="hover:text-orange-400">
                      {faction.faction.name}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{faction.faction.happiness}</td>
                  <td className="px-6 py-4">{faction.faction.allegiance.name}</td>
                  <td className="px-6 py-4">{faction.faction.government.name}</td>
                  <td className="px-6 py-4">{faction.faction.state}</td>
                  <td className="px-6 py-4">{DateFormat.fromNow(faction.faction.updated_at)}</td>
                  <td className="px-6 py-4">
                    {
                      <Icon
                        path={mdiChevronUp}
                        rotate={open.includes(faction.id) ? 180 : 0}
                        size={1}
                      />
                    }
                  </td>
                </tr>
                <tr
                  className="hidden faction-info border-b border-gray-700"
                  id={`faction-row-${faction.id}`}
                >
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full flex flex-col">
                      {filterStations(faction).map((station: IStation) => {
                        return station.name
                      })}
                    </div>
                  </td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Factions
