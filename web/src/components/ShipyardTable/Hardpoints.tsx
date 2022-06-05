import React, { FC } from 'react'
import { Hardpoint } from '../../interfaces/IShip'

const Hardpoints: FC<{ hardpoints: Hardpoint[] }> = ({ hardpoints }) => {
  const size = (size: string): string => {
    switch (size) {
      case '1':
        return 'Small'
      case '2':
        return 'Medium'
      case '3':
        return 'Large'
      case '4':
        return 'Huge'
      default:
        return 'Unknown'
    }
  }

  return (
    <>
      <span className="font-bold text-gray-400 uppercase text-md">
        Hardpoints
        {hardpoints.map((hardpoint: Hardpoint, index: number) => {
          return (
            <div
              key={index}
              className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5"
            >
              <div className="w-1/2 text-sm text-gray-200 uppercase">{hardpoint.module}</div>
              <div className="flex justify-end w-1/2 text-3xl text-gray-400">{hardpoint.size}</div>
              <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
                {size(hardpoint.size)} Hardpoint
              </div>
            </div>
          )
        })}
      </span>
    </>
  )
}

export default Hardpoints
