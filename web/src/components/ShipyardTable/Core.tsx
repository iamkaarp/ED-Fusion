import React, { FC } from 'react'

import { CoreInternals } from '../../interfaces/IShip'

interface CoreProps {
  core: CoreInternals
}

const Core: FC<CoreProps> = ({ core }) => {
  return (
    <>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">{core.power_plant} Power plant</div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.power_plant.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">Reactor Bay</div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">{core.thrusters} Thrusters</div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.thrusters.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
          Thruster mounting
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-gray-200 uppercase">{core.fsd} Frame shift drive</div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">{core.fsd.split('')[0]}</div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
          Thruster mounting
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">
          {core.life_support} Life support
        </div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.life_support.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
          Environment control
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">
          {core.power_distributor} Power distributor
        </div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.power_distributor.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">
          Power coupling
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">{core.sensor} Sensors</div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.sensor.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">Sensor suite</div>
      </div>
      <div className="w-full flex flex-wrap justify-between py-1.5 px-3 bg-gray-700 mb-1.5">
        <div className="w-1/2 text-sm text-gray-200 uppercase">{core.fuel_tank} Fuel Tank</div>
        <div className="flex justify-end w-1/2 text-3xl text-gray-400">
          {core.fuel_tank.split('')[0]}
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500 uppercase">Fuel Store</div>
      </div>
    </>
  )
}

export default Core
