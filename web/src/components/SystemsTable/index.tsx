import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import System from '../../apis/System'

import ISystem from '../../interfaces/ISystem'
import ISystemsTable from './interfaces/ISystemsTable'
import IFilters from '../SystemsTable/interfaces/IFilters'

import DateFormat from '../../helpers/DateFormat'
import Pagination from '../Pagination'

import './css/index.scss'

import Loader from '../Loader/index'
import Table from '../Table'
import Filters from './Filters'

const SystemsTable: FC<ISystemsTable> = ({ page }) => {
  const [systems, setSystems] = useState<ISystem[]>([])
  const [meta, setMeta] = useState<any>()
  const [column, setColumns] = useState<string>('distance')
  const [direction, setDirection] = useState<string>('asc')
  const [loading, setLoading] = useState<boolean>(true)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const [filters, setFilters] = useState<IFilters>({
    showPopulated: true,
    needsPermit: false,
    hasStations: '',
    government: '',
    allegiance: '',
  })

  const fetchData = async () => {
    setLoading(true)
    const res = await System.index(page, column, direction, filters)
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
  }, [page, column, direction, filters])

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

  const onFilter = (value: string, items: any | any[] = []): void => {
    let f = { ...filters }
    switch (value) {
      case 'showPopulated':
        f = { ...filters, showPopulated: !filters.showPopulated }
        break
      case 'needsPermit':
        f = { ...filters, needsPermit: !filters.needsPermit }
        break
    }
    setFilters(f)
  }

  const th = [
    {
      name: 'System',
      sort: 'name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Population',
      sort: 'population',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Stations',
      sort: 'stations',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Fleet carriers',
      sort: 'fleetcarriers',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Distance Sol',
      sort: 'distance',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Updated',
      sort: 'updated_at',
      sortable: true,
      mobile: true,
    },
  ]

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
          <div className="flex items-center justify-between w-full px-4 md:px-0">
            <h1 className="mb-4 text-3xl text-gray-400">Systems</h1>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table th={th} loading={loading} onSort={sort} column={column} direction={direction}>
              {systems.map((system: ISystem) => {
                return (
                  <tr
                    key={system.id}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="font-medium px-1.5 py-2 text-white md:px-6 md:py-4 whitespace-nowrap"
                    >
                      <Link to={`/system/${system.name}`} className="hover:text-orange-400">
                        {system.name}
                      </Link>
                    </th>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {system.population.toLocaleString()}
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {countStations(system.stations)}
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {countFleetcarriers(system.stations)}
                    </td>
                    <td className="px-1.5 py-2 md:px-6 md:py-4">{system.distance} Ly</td>
                    <td className="px-1.5 py-2 md:px-6 md:py-4">
                      {DateFormat.fromNow(system.updated_at)}
                    </td>
                  </tr>
                )
              })}
            </Table>
          </div>
          <div className="w-full mt-4">
            <Pagination view="systems" currentPage={page} lastPage={meta.last_page} />
          </div>
        </>
      )}
    </>
  )
}

export default SystemsTable
