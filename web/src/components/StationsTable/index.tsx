import React, { FC, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import _debounce from 'lodash/debounce'

import Station from '../../apis/Station'

import IStation from '../../interfaces/IStation'
import IStationsTable from './interfaces/IStationsTable'

import DateFormat from '../../helpers/DateFormat'
import getStationTypes from '../../helpers/StationTypes'
import Pagination from '../Pagination'

import Loader from '../Loader/index'
import Table from '../Table'
import Filters from './Filters'
import IFilters from './interfaces/IFilters'

const StationsTable: FC<IStationsTable> = ({ page }) => {
  const [stations, setStations] = useState<IStation[]>([])
  const [meta, setMeta] = useState<any>()
  const [column, setColumns] = useState<string>('distance')
  const [direction, setDirection] = useState<string>('asc')
  const [loading, setLoading] = useState<boolean>(true)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const [filters, setFilters] = useState<IFilters>({
    showFc: false,
    showPlanetary: true,
    services: [],
    commodities: [],
    types: [],
    arrival: null,
    modules: [],
    ships: [],
  })

  const fetchData = async () => {
    setLoading(true)
    const res = await Station.index(page, column, direction, filters)
    setStations(res.data)
    setMeta(res.meta)
    setLoading(false)
  }

  const onFilter = (value: string, items: any | any[] = []): void => {
    let f = { ...filters }
    switch (value) {
      case 'showFc':
        f = { ...filters, showFc: !filters.showFc }
        break
      case 'showPlanetary':
        f = { ...filters, showPlanetary: !filters.showPlanetary }
        break
      case 'services':
        const services = items.map((item: any) => item.key)
        f = { ...filters, services }
        break
      case 'commodities':
        const commodities = items.map((item: any) => item.key)
        f = { ...filters, commodities }
        break
      case 'types':
        const types = items.map((item: any) => item.key)
        f = { ...filters, types }
        break
      case 'arrival':
        if (items[0] !== null) {
          f = { ...filters, arrival: items[0] }
        }
        break
      case 'modules':
        const modules = items.map((item: any) => item.key)
        f = { ...filters, modules }
        break
      case 'ships':
        const ships = items.map((item: any) => item.key)
        f = { ...filters, ships }
        break
    }
    setFilters(f)
  }

  useEffect(() => {
    fetchData()
  }, [page, column, direction, filters])

  useEffect(() => {
    setFirstLoad(true)
    if (stations.length > 0) {
      setFirstLoad(false)
    }
  }, [stations])

  const sort = (column: string, direction: string) => {
    setColumns(column)
    setDirection(direction)
  }

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
      name: 'System',
      sort: 'systems.name',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Allegiance',
      sort: 'super_powers.name',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Distance From Star',
      sort: 'distance_from_star',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Distance Sol',
      sort: 'distance',
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
            <h1 className="mb-4 text-3xl text-gray-400">Stations</h1>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setShowFilters(!showFilters)
              }}
              className="text-gray-400 cursor-pointer hover:text-orange-400"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </a>
          </div>
          <div className={`${showFilters ? 'flex' : 'hidden'} w-full`}>
            <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
              <div className="w-full">
                <Filters
                  onFilter={(value: string, items: any[] = []) => onFilter(value, items)}
                  filters={filters}
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table th={th} loading={loading} onSort={sort} column={column} direction={direction}>
              {stations.map((station: IStation) => {
                return (
                  <tr
                    key={station.id}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="font-medium px-1.5 py-2 text-white md:px-6 md:py-4 whitespace-nowrap"
                    >
                      <Link to={`/station/${station.name}`} className="hover:text-orange-400">
                        {station.name}
                      </Link>
                    </th>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {getStationTypes(station.type)}
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      <Link to={`/system/${station.system.name}`} className="hover:text-orange-400">
                        {station.system.name}
                      </Link>
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {station.allegiance.name}
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {station.distance_from_star} Ls
                    </td>
                    <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {station.system.distance} Ly
                    </td>
                    <td className="px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                      {DateFormat.fromNow(station.updated_at)}
                    </td>
                  </tr>
                )
              })}
            </Table>
          </div>
          <div className="w-full mt-4">
            <Pagination view="stations" currentPage={page} lastPage={meta.last_page} />
          </div>
        </>
      )}
    </>
  )
}

export default StationsTable
