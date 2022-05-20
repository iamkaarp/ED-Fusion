import React, { FC } from 'react'
import { useParams, Link } from 'react-router-dom'

import IShipyard from '../../interfaces/IShipyard'
import IDiscount from '../../interfaces/IDiscount'

import shipyard from '../../helpers/Shipyard'

import './css/Shipyard.scss'

interface Shipyard {
  ships: IShipyard[]
  discount: IDiscount[]
}

const Shipyard: FC<Shipyard> = ({ ships, discount }) => {
  const { name } = useParams()
  const price = (price: number, manufacturer: string, ship: string) => {
    const d = discount.find((d) => {
      return (
        d.stations.includes(name!) &&
        (d.ships.includes(ship) ||
          d.ships.includes('*') ||
          d.ships.includes(manufacturer) ||
          d.ships.includes('*'))
      )
    })
    if (d) {
      if (
        d.ships === '*' ||
        d.ships.includes(ship) ||
        d.manufacturer.includes(manufacturer) ||
        d.manufacturer === '*'
      ) {
        return (
          <>
            <span className="line-through">({price.toLocaleString()} Cr)</span>
            <span className="ml-1 text-red-400">
              {Math.round(price * (1 - d.discount)).toLocaleString()} Cr
            </span>
          </>
        )
      } else {
        return <span>{price.toLocaleString()} Cr</span>
      }
    } else {
      return <span>{price.toLocaleString()} Cr</span>
    }
  }

  return (
    <>
      {ships.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-5">
          {ships.map((ship: IShipyard) => {
            return (
              <Link key={ship.id} to={`/shipyard/${ship.ship.name}`}>
                <div className="bg-gray-700 border-gray-900 rounded-lg shadow-md shipyard ">
                  <div
                    className="w-full ship-image"
                    style={{ backgroundImage: `url(${shipyard[ship.name]})` }}
                  />
                  <div className="p-5">
                    <span className="text-lg font-bold text-white ship-name">{ship.ship.name}</span>
                    <p className="text-sm font-bold text-gray-300">{ship.ship.manufacturer}</p>
                    <p className="mb-3 font-normal text-gray-400">
                      {price(ship.ship.price, ship.ship.manufacturer, ship.ship.name)}
                    </p>
                    <p className="mb-3 text-xs text-gray-400">
                      {ship.ship.rank !== '' ? ship.ship.rank : '\u00A0'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">No ships found</div>
      )}
    </>
  )
}

export default Shipyard
