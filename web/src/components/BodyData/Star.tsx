import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import DateFormat from '../../helpers/DateFormat'

import IStar from '../../interfaces/IStar'

interface Star {
  data: IStar
}

const Star: FC<Star> = ({ data }) => {
  const scoopable = ['O', 'B', 'A', 'F', 'G', 'K', 'M']
  const SOL_RAD = 696340
  return (
    <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
      <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-gray-700">
        <h1 className="text-3xl">
          {data.name} {data.type} {data.luminosity}
          {data.sub_class} {scoopable.includes(data.type) ? ' - Scoopable' : ''}
        </h1>
        <p>{DateFormat.fromNow(data.updated_at)}</p>
      </div>
      <div className="w-full md:flex">
        <div className="flex flex-col w-full pb-4 mb-4 border-b border-gray-400 md:mb-0 md:pb-0 md:w-1/2 md:border-0">
          <h2 className="mb-8 text-xl font-bold text-center" />
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">System</div>
            <div className="w-1/2 font-bold md:w-3/4">
              <Link className="hover:text-orange-400" to={`/system/${data.body.system.name}`}>
                {data.body.system.name}
              </Link>{' '}
              -{' '}
              <Link
                className="hover:text-orange-400"
                to={`/system/${data.body.system.name}/bodies`}
              >
                All Bodies
              </Link>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Distance to Sol</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.body.system.distance.toLocaleString()} Ly
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Spectral Class</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.type} {data.luminosity}
              {data.sub_class} {scoopable.includes(data.type) ? ' - Scoopable' : ''}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Luminosity Class</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.luminosity}</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Age</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.age.toLocaleString()} Million Years
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Solar Masses</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.mass}</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Solar Radius</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {(data.radius / 1000 / SOL_RAD).toLocaleString()}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Surface Temperature</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.temperature} K</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Absolute Magniture</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.absolute_magnitude} K</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Main Star</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.is_main ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Star
