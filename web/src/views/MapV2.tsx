import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react'
import _debounce from 'lodash/debounce'

import { ScatterGL, Point3D, PointMetadata, Dataset, RenderMode } from 'scatter-gl'

import System from '../apis/System'

import Loader from '../components/Loader'

export interface Data {
  labelNames: string[]
  projection: [number, number, number][]
}

const MapV2: FC = () => {
  const [systems, setSystems] = useState<any[]>([])
  const [distance, setDistance] = useState<number>(150)
  const [dataset, setDataset] = useState<Dataset>({} as Dataset)
  const [firstRender, setFirstRender] = useState(true)
  const fetchData = async () => {
    const res = await System.positions(distance)
    setSystems(res)
  }

  const containerRef = useRef<HTMLDivElement>(null)

  const loader = `
  <svg
      style="height: 170px"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="m5,8l5,8l5,-8z" class="l1 d1" />
      <path d="m5,8l5,-8l5,8z" class="l1 d2" />
      <path d="m10,0l5,8l5,-8z" class="l1 d3" />
      <path d="m15,8l5,-8l5,8z" class="l1 d4" />
      <path d="m20,0l5,8l5,-8z" class="l1 d5" />
      <path d="m25,8l5,-8l5,8z" class="l1 d6" />
      <path d="m25,8l5,8l5,-8z" class="l1 d7" />
      <path d="m30,16l5,-8l5,8z" class="l1 d8" />
      <path d="m30,16l5,8l5,-8z" class="l1 d9" />
      <path d="m25,24l5,-8l5,8z" class="l1 d10" />
      <path d="m25,24l5,8l5,-8z" class="l1 d11" />
      <path d="m20,32l5,-8l5,8z" class="l1 d13" />
      <path d="m15,24l5,8l5,-8z" class="l1 d14" />
      <path d="m10,32l5,-8l5,8z" class="l1 d15" />
      <path d="m5,24l5,8l5,-8z" class="l1 d16" />
      <path d="m5,24l5,-8l5,8z" class="l1 d17" />
      <path d="m0,16l5,8l5,-8z" class="l1 d18" />
      <path d="m0,16l5,-8l5,8z" class="l1 d20" />
      <path d="m10,16l5,-8l5,8z" class="l2 d0" />
      <path d="m15,8l5,8l5,-8z" class="l2 d3" />
      <path d="m20,16l5,-8l5,8z" class="l2 d6" />
      <path d="m20,16l5,8l5,-8z" class="l2 d9" />
      <path d="m15,24l5,-8l5,8z" class="l2 d12" />
      <path d="m10,16l5,8l5,-8z" class="l2 d15" />
    </svg>
  `
  let scatterGL: ScatterGL

  useEffect(() => {
    if (Object.keys(dataset).length > 0) {
      const containerElement = document.getElementById('container')!
      containerElement.innerHTML = ''
      scatterGL = new ScatterGL(containerElement, {
        renderMode: 'POINT' as RenderMode,
        rotateOnStart: false,
        orbitControls: {
          zoomSpeed: 1.0,
          autoRotateSpeed: 0.5,
          mouseRotateSpeed: 0.5,
        },
        styles: {
          backgroundColor: 0x111827,
          axesVisible: false,
          point: {
            scaleDefault: 0.2,
            scaleHover: 0.5,
            scaleSelected: 0.2,
            colorNoSelection: 'rgba(255,255,255,0.2)',
            colorUnselected: 'rgba(255,255,255,0.2)',
            colorHover: 'rgba(251,146,60, 0.4)',
            colorSelected: 'rgba(251,146,60, 0.4)',
          },
        },
        camera: {
          zoom: 15,
        },
      })

      scatterGL.render(dataset)
      scatterGL.setPointColorer((i: any) => {
        if (i === 0) {
          return 'rgb(251,146,60)'
        }
        return 'rgba(255,255,255,0.2)'
      })
      setFirstRender(false)
    }
  }, [dataset])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const containerElement = document.getElementById('container')!
      containerElement.innerHTML = loader
      fetchData()
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [distance])

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(e.target.value))
  }

  useEffect(() => {
    if (Object.keys(systems).length > 0) {
      const data: Data = {
        labelNames: systems.map(
          (s) => `${s.name} | ${s.distance} Ly from Sol (${s.position.split(';').join(' / ')})`
        ),
        projection: systems.map((s) => {
          const [x, y, z] = s.position.split(';')
          return [parseFloat(x), parseFloat(y), parseFloat(z)]
        }),
      }

      const dataPoints: Point3D[] = []
      const metadata: PointMetadata[] = []

      data.projection.forEach((vector) => {
        dataPoints.push(vector)
        metadata.push({
          label: data.labelNames[dataPoints.length - 1],
        })
      })

      setDataset(new Dataset(dataPoints, metadata))
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
              max="70000"
              step="10"
              value={distance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-700 appearance-none range"
            />
          </div>
        </div>
      </div>
      <div
        id="container"
        ref={containerRef}
        className="flex items-center justify-center w-full min-h-full"
      >
        <Loader />
      </div>
    </div>
  )
}

export default MapV2
