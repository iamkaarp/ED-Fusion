import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'lodash'

import System from '../../apis/System'

import ISystemBodies from './interfaces/ISystemBodies'
import IPlanet from '../../interfaces/IPlanet'
import IStar from '../../interfaces/IStar'

import DateFormat from '../../helpers/DateFormat'

import Table from '../Table/index'

const Bodies: FC<ISystemBodies> = ({ systemId }) => {
  const [planets, setPlanets] = useState<IPlanet[]>([])
  const [stars, setStars] = useState<IStar[]>([])
  const [loadingPlanets, setLoadingPlanets] = useState<boolean>(true)
  const [loadingStars, setLoadingStars] = useState<boolean>(true)
  const starColumn = useSelector((state: any) => state.sort.stars.column)
  const starDirection = useSelector((state: any) => state.sort.stars.direction)
  const planetColumn = useSelector((state: any) => state.sort.planets.column)
  const planetDirection = useSelector((state: any) => state.sort.planets.direction)
  const dispatch = useDispatch()

  const onSortStars = (column: string, direction: string) => {
    dispatch({ type: 'sort/setColumn', payload: { type: 'stars', column } })
    dispatch({ type: 'sort/setDirection', payload: { type: 'stars', direction } })
  }

  const onSortPlanets = (column: string, direction: string) => {
    dispatch({ type: 'sort/setColumn', payload: { type: 'planets', column } })
    dispatch({ type: 'sort/setDirection', payload: { type: 'planets', direction } })
  }

  const thStars = [
    {
      name: 'Name',
      sort: 'name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Type',
      sort: 'type',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Main Star',
      sort: 'is_main',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Sol Masses',
      sort: 'mass',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Distance from Arrival',
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

  const thPlanets = [
    {
      name: 'Name',
      sort: 'name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Class',
      sort: 'class',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Landable',
      sort: 'landable',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Atmosphere',
      sort: 'atmosphere',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Earth Masses',
      sort: 'mass',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Distance from Arrival',
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

  const fetchPlanets = _.memoize(async () => {
    setLoadingPlanets(true)
    const bodies = await System.bodies.planets(systemId, planetColumn, planetDirection)
    setPlanets(bodies.planets)
    setLoadingPlanets(false)
  })

  const fetchStars = _.memoize(async () => {
    setLoadingStars(true)
    const bodies = await System.bodies.stars(systemId, starColumn, starDirection)
    setStars(bodies.stars)
    setLoadingStars(false)
  })

  useEffect(() => {
    fetchPlanets()
  }, [planetColumn, planetDirection])

  useEffect(() => {
    fetchStars()
  }, [starColumn, starDirection])

  return (
    <>
      {stars.length === 0 && planets.length === 0 ? (
        <div className="flex items-center justify-center h-full">No Bodies found</div>
      ) : (
        <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
          {stars.length > 0 && (
            <div className="w-full sm:rounded-lg">
              <Table
                th={thStars}
                column={starColumn}
                direction={starDirection}
                loading={loadingStars}
                onSort={onSortStars}
              >
                {stars.map((star: IStar) => {
                  return (
                    <tr
                      key={star.id}
                      className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                      >
                        <Link to={`/body/${star.name}`} className="hover:text-orange-400">
                          {star.name}
                        </Link>
                      </th>
                      <td className="px-1.5 py-2 md:px-6 md:py-4">{star.type}</td>
                      <td className="px-1.5 py-2 md:px-6 md:py-4">{star.is_main ? 'Yes' : 'No'}</td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {star.mass}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {star.distance.toLocaleString()} Ls
                      </td>
                      <td className="px-1.5 py-2 md:px-6 md:py-4">
                        {DateFormat.fromNow(star.updated_at)}
                      </td>
                    </tr>
                  )
                })}
              </Table>
            </div>
          )}

          {planets.length > 0 && (
            <div className="w-full mt-8 sm:rounded-lg">
              <Table
                th={thPlanets}
                column={planetColumn}
                direction={planetDirection}
                loading={loadingPlanets}
                onSort={onSortPlanets}
              >
                {planets.map((planet: IPlanet) => {
                  return (
                    <tr
                      key={planet.id}
                      className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                      >
                        <Link to={`/body/${planet.name}`} className="hover:text-orange-400">
                          {planet.name}
                        </Link>
                      </th>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {planet.class}
                      </td>
                      <td className="px-1.5 py-2 md:px-6 md:py-4">
                        {planet.landable ? 'Yes' : 'No'}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {planet.atmosphere.match(/[A-Z][a-z]+/g)?.join(' ')}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {planet.mass}
                      </td>
                      <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                        {planet.distance.toLocaleString()} Ls
                      </td>
                      <td className="px-1.5 py-2 md:px-6 md:py-4">
                        {DateFormat.fromNow(planet.updated_at)}
                      </td>
                    </tr>
                  )
                })}
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Bodies
