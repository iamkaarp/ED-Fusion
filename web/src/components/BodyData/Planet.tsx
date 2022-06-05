import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import DateFormat from '../../helpers/DateFormat'

import IPlanet from '../../interfaces/IPlanet'

interface Planet {
  data: IPlanet
}

const Planet: FC<Planet> = ({ data }) => {
  const AU = 149597871

  return (
    <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
      <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-gray-700">
        <h1 className="text-3xl">
          {data.name} - {data.class}
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
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Distance to Arrival</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.distance.toFixed(2).toLocaleString()} Ls
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Landable</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.landable ? 'Yes' : 'No'}</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Terraforming</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.terraform_state !== '' ? data.terraform_state : 'Not Terraformable'}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Earth Masses</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.mass}</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Radius</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.radius / 1000} Km</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Surface Temperature</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.surface_temperature} K</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Surface Pressure</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {(data.surface_pressure / 100 / 1000).toFixed(2)} Atmospheres
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Volcanism</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.volcanism !== '' ? data.volcanism : 'None'}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Atmosphere</div>
            <div className="w-1/2 font-bold md:w-3/4">{data.atmosphere}</div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Orbital Period</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {Math.floor(data.orbital_period / 3600 / 24)} Days
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Rotational Period</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {Math.ceil(data.rotation_period / 3600)} Hours
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Semi Major Axis</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {Math.floor(data.semi_major_axis / AU) / 1000} AU
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Composition</div>
            <div className="w-1/2 font-bold md:w-3/4">
              {data.compositions.length > 0
                ? data.compositions.map((composition) => {
                    return (
                      <div key={composition.id}>
                        {composition.amount * 100}% {composition.type}
                      </div>
                    )
                  })
                : 'None'}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Materials</div>
            <div className="w-1/2 font-bold capitalize md:w-3/4">
              {data.materials.length > 0
                ? data.materials.map((material) => {
                    return (
                      <div key={material.id}>
                        {Math.floor(material.amount)}% {material.type}
                      </div>
                    )
                  })
                : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planet
