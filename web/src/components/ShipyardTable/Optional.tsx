import { type } from '@testing-library/user-event/dist/type'
import React, { FC } from 'react'
import { Optional } from '../../interfaces/IShip'

const Optionals: FC<{ optionals: Optional[] }> = ({ optionals }) => {
  return (
    <>
      <span className="font-bold text-neutral-400 uppercase text-md">
        Optional Interals
        {optionals.map((optional: Optional, index: number) => {
          return (
            <div
              key={index}
              className="w-full flex flex-wrap justify-between py-1.5 px-3 relative bg-neutral-700 mb-1.5"
            >
              <div className="absolute w-full text-sm text-neutral-200 uppercase">
                {optional.module}
              </div>
              <div className="flex justify-end w-full text-3xl text-neutral-400">
                {optional.size}
              </div>
              <div className="flex justify-end w-full text-xs text-neutral-500 uppercase">
                {optional.type === 'internal' && 'Internal Compartment'}
                {optional.type === 'military' && 'Military Compartment'}
              </div>
            </div>
          )
        })}
      </span>
    </>
  )
}

export default Optionals
