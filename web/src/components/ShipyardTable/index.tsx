import React, { FC, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as _ from 'lodash'

import EDFusion from '../../apis/EDFusion'
import shipyard from '../../helpers/Shipyard'

import IShip from '../../interfaces/IShip'

import Loader from '../Loader'

const ShipyardTable: FC = () => {
  const [ships, setShips] = useState<IShip[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchShips = _.memoize(async () => {
    setLoading(true)
    const res = await EDFusion.ships.index()
    setShips(res.data)
    setLoading(false)
  })

  useEffect(() => {
    fetchShips()
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="w-full p-2 mb-6 text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-lg shadow-md md:p-6">
          <div className="flex justify-between w-full pb-4 mb-4 border-b border-neutral-700">
            <h1 className="text-3xl">Shipyard</h1>
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-5">
            {ships.map((ship: IShip) => {
              return (
                <Link key={ship.id} to={`/shipyard/${ship.name}`}>
                  <div className="bg-neutral-700 border-neutral-900 rounded-lg shadow-md shipyard ">
                    <div
                      className="ship-image"
                      style={{ backgroundImage: `url(${shipyard[ship.key]})` }}
                    />
                    <div className="p-5">
                      <span className="text-lg font-bold text-white ship-name">{ship.name}</span>
                      <p className="text-sm font-bold text-neutral-300">{ship.manufacturer}</p>
                      <p className="mb-3 font-normal text-neutral-400">
                        {ship.price.toLocaleString()}
                      </p>
                      <p className="mb-3 text-xs text-neutral-400">
                        {ship.rank !== '' ? ship.rank : '\u00A0'}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default ShipyardTable
