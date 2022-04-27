import React, { FC, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import _debounce from 'lodash/debounce'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiMenuUp } from '@mdi/js'

import EDFusion from '../../apis/EDFusion'

import ISystem from '../../interfaces/ISystem'
import ISystemsTable from './interfaces/ISystemsTable'

import DateFormat from '../../helpers/DateFormat'
import Pagination from '../Pagination'

import './css/index.scss'

import Loader from '../Loader/index'

const SystemsTable: FC<ISystemsTable> = ({ page }) => {
  const [systems, setSystems] = useState<ISystem[]>([])
  const [meta, setMeta] = useState<any>()
  const [column, setColumns] = useState<string>('distance')
  const [direction, setDirection] = useState<string>('asc')
  const [loading, setLoading] = useState<boolean>(true)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const fetchData = async () => {
    setLoading(true)
    const res = await EDFusion.systems.index(page, column, direction)
    setSystems(res.data)
    setMeta(res.meta)
    setLoading(false)
  }

  const countStations = (stations: any): number => {
    return stations.filter((obj: any) => obj.type !== 'FleetCarrier').length
  }

  const countFleetcarriers = (stations: any): number => {
    return stations.filter((obj: any) => obj.type === 'FleetCarrier').length
  }

  useEffect(() => {
    fetchData()
  }, [page, column, direction])

  useEffect(() => {
    setFirstLoad(true)
    if (systems.length > 0) {
      setFirstLoad(false)
    }
  }, [systems])

  const sort = (column: string, direction: string) => {
    setColumns(column)
    setDirection(direction)
  }

  return (
    <>
      {firstLoad ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {loading && (
              <div
                className="absolute flex items-center justify-center w-full h-full"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <Loader />
              </div>
            )}
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:text-orange-400"
                    onClick={() => {
                      sort('name', direction === 'asc' ? 'desc' : 'asc')
                    }}
                  >
                    <div className="flex items-center">
                      System
                      {column === 'name' && (
                        <Icon path={direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={1} />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:text-orange-400"
                    onClick={() => {
                      sort('population', direction === 'asc' ? 'desc' : 'asc')
                    }}
                  >
                    <div className="flex items-center">
                      Population
                      {column === 'population' && (
                        <Icon path={direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={1} />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stations
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fleet Carriers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:text-orange-400"
                    onClick={() => {
                      sort('distance', direction === 'asc' ? 'desc' : 'asc')
                    }}
                  >
                    <div className="flex items-center">
                      Distance Sol
                      {column === 'distance' && (
                        <Icon path={direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={1} />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer hover:text-orange-400"
                    onClick={() => {
                      sort('updated_at', direction === 'asc' ? 'desc' : 'asc')
                    }}
                  >
                    <div className="flex items-center">
                      Updated At
                      {column === 'updated_at' && (
                        <Icon path={direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={1} />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {systems.map((system: ISystem) => {
                  return (
                    <tr
                      key={system.id}
                      className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-white whitespace-nowrap"
                      >
                        <Link to={`/system/${system.name}`} className="hover:text-orange-400">
                          {system.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{system.population.toLocaleString()}</td>
                      <td className="px-6 py-4">{countStations(system.stations)}</td>
                      <td className="px-6 py-4">{countFleetcarriers(system.stations)}</td>
                      <td className="px-6 py-4">{system.distance} Ly</td>
                      <td className="px-6 py-4">{DateFormat.fromNow(system.updated_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-4">
            <Pagination currentPage={page} lastPage={meta.last_page} />
          </div>
        </>
      )}
    </>
  )
}

export default SystemsTable
