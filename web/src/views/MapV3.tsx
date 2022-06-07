import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react'
import _debounce from 'lodash/debounce'

import GalaxyMap, { GalaxyMapOptions, DataSet } from '../helpers/GalaxyMap'

import System from '../apis/System'

import Loader from '../components/Loader'

export interface Data {
  labelNames: string[]
  projection: [number, number, number][]
}

const MapV3: FC = () => {
  const [systems, setSystems] = useState<any[]>([])
  const [distance, setDistance] = useState<number>(150)
  //const [dataset, setDataset] = useState<Dataset>({} as Dataset)
  const [firstRender, setFirstRender] = useState(true)
  const fetchData = async () => {
    const res = await System.positions(distance)
    setSystems(res)
  }
  let galMap: GalaxyMap

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (Object.keys(systems).length > 0) {
      const data: DataSet[] = systems.map((system) => {
        const [x, y, z] = system.position.split(';')
        return {
          x: parseFloat(x),
          y: parseFloat(y),
          z: parseFloat(z),
          label: system.name,
        }
      })
      const renderElement = document.getElementById('container')!
      const options: GalaxyMapOptions = {
        point: {
          size: 1,
          color: '#fff',
          hoverColor: '#f0f',
        },
        grid: {
          color: 'rgb(55,65,81)',
          centerColor: 'rgb(209,213,219)',
        },
      }
      galMap = new GalaxyMap(renderElement, options)
      galMap.dataset(data)
      galMap.setBackground('rgb(17,24,39)')
      galMap.lateralGrid()
      galMap.render()
    }
  }, [systems])

  return (
    <div className="relative flex w-full min-h-full">
      <div className="absolute left-8 right-8">
        <div className="w-full p-4 mt-20 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:w-3/12">
          <div className="relative pt-1">
            <label htmlFor="step" className="font-bold text-gray-400">
              Show distance from Sol ({distance} Ly)
            </label>
            <input
              type="range"
              min="150"
              max="1000000"
              step="10"
              className="w-full h-2 bg-gray-700 appearance-none range"
            />
          </div>
        </div>
      </div>
      <div id="container" className="flex items-center justify-center w-full min-h-full">
        <Loader />
      </div>
    </div>
  )
}

export default MapV3
