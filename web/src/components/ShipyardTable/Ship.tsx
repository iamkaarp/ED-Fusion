import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'

import EDFusion from '../../apis/EDFusion'
import IShip from '../../interfaces/IShip'

import shipyard from '../../helpers/Shipyard'
import manufacturer from '../../helpers/Manufacturers'

import Loader from '../Loader'
import Core from './Core'
import Stats from './Stats'
import Hardpoints from './Hardpoints'
import Table from '../Table'

import './css/Ship.scss'
import Optional from './Optional'

interface ShipProps {
  name: string
}

const Ship: FC<ShipProps> = ({ name }) => {
  const [ship, setShip] = useState<IShip>({} as IShip)
  const [stations, setStations] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const refSytem = useSelector((state: any) => state.refSystem.system)

  const fetchShips = _.memoize(async () => {
    setLoading(true)
    const res = await EDFusion.ships.get(name)
    setShip(res.data)
    setLoading(false)
  })

  const fetchNearest = _.memoize(async () => {
    const res = await EDFusion.ships.nearest(ship.key, { system: refSytem })
    setStations(res.data)
  })

  const utiliy = (utiliy: number): string[] => {
    const c = []
    for (let i = 0; i < utiliy; i++) {
      c.push('')
    }

    return c
  }

  const th = [
    {
      name: 'Station',
      sortable: false,
      sort: 'name',
      mobile: true,
    },
    {
      name: 'System',
      sortable: false,
      sort: 'name',
      mobile: true,
    },
    {
      name: 'Distance',
      sortable: false,
      sort: 'name',
      mobile: true,
    },
  ]

  useEffect(() => {
    fetchShips()
  }, [])

  useEffect(() => {
    if (Object.keys(ship).length) {
      fetchNearest()
    }
  }, [ship, refSytem])

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
          <div className="flex justify-between w-full pb-4 mb-4 border-b border-gray-700">
            <p className="text-3xl">Shipyard - {name}</p>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="order-1 w-full mr-2 md:w-1/3">
              <div className="flex w-full mb-4 md:hidden">
                <div
                  className="manufacturer"
                  style={{
                    backgroundImage: `url(${
                      manufacturer[ship.manufacturer.split(' ').join('').toLocaleLowerCase()]
                    })`,
                  }}
                />
              </div>
              <div
                className="rounded-lg ship-image"
                style={{ backgroundImage: `url(${shipyard[ship.key]})` }}
              />
              <div className="flex flex-col order-2 w-full mt-4 mb-4">
                <span className="mb-2 font-bold text-gray-400 uppercase text-md">
                  Specifications
                </span>
                <Stats ship={ship} />
              </div>
              <div className="flex flex-col order-2 w-full mt-4 mb-4">
                <span className="mb-2 font-bold text-gray-400 uppercase text-md">
                  Nearest station from {refSytem}
                </span>
                <Table th={th} onSort={() => {}} loading={false} column="dist" direction="asc">
                  {stations.map((station: any) => {
                    return (
                      <tr
                        key={station.id}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                        >
                          <Link
                            to={`/station/${station.station.name}`}
                            className="hover:text-orange-400"
                          >
                            {station.station.name}
                          </Link>
                        </th>
                        <td className="px-1.5 py-2 table-cell md:px-6 md:py-4">
                          <Link
                            to={`/system/${station.station.system.name}`}
                            className="hover:text-orange-400"
                          >
                            {station.station.system.name}
                          </Link>
                        </td>
                        <td className="px-1.5 py-2 table-cell md:px-6 md:py-4">
                          {station.meta.dist} Ly
                        </td>
                      </tr>
                    )
                  })}
                </Table>
              </div>
            </div>
            <div className="flex flex-col order-1 w-full md:ml-2 md:w-2/3">
              <div className="hidden w-full mb-4 md:flex">
                <div
                  className="manufacturer"
                  style={{
                    backgroundImage: `url(${
                      manufacturer[ship.manufacturer.split(' ').join('').toLocaleLowerCase()]
                    })`,
                  }}
                />
              </div>
              <div className="w-full md:flex md:flex-row">
                <div className="w-full md:w-1/2 md:mr-2">
                  <Hardpoints hardpoints={ship.stats.hardpoints} />
                  <span className="font-bold text-gray-400 uppercase text-md">
                    Utility Mounts
                    {utiliy(ship.stats.utility).map((u: any, index: number) => {
                      return (
                        <div key={index} className="w-full py-1.5 pr-3 bg-gray-700 mb-1.5">
                          <div className="flex justify-end w-full text-3xl text-gray-400">0</div>
                          <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
                            Utility Mount
                          </div>
                        </div>
                      )
                    })}
                  </span>
                </div>
                <div className="w-full md:w-1/2 md:ml-2">
                  <span className="font-bold text-gray-400 uppercase text-md">
                    <Optional optionals={ship.stats.optionals} />
                  </span>
                  <span className="font-bold text-gray-400 uppercase text-md">
                    Core internals
                    <Core core={ship.stats.core} />
                  </span>
                  <span className="font-bold text-gray-400 uppercase text-md">
                    Armour
                    <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
                      <div className="w-1/2 text-sm text-gray-200 uppercase">
                        1I Lightweight Alloy
                      </div>
                      <div className="flex justify-end w-1/2 text-3xl text-gray-400">1</div>
                      <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
                        bulkheads
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Ship
