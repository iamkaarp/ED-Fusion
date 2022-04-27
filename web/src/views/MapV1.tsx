import React, { FC, useEffect, useState, useRef } from 'react'

import Plotly from 'plotly.js'

import EDFusion from '../apis/EDFusion'

const MapV1: FC = () => {
  const [systems, setSystems] = useState<any[]>([])
  const fetchData = async () => {
    const res = await EDFusion.systems.positions()
    setSystems(res)
  }
  const chartDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const x = systems.map((system) => parseFloat(system.position.split(';')[0]))
    const y = systems.map((system) => parseFloat(system.position.split(';')[1]))
    const z = systems.map((system) => parseFloat(system.position.split(';')[2]))
    const name = systems.map((system) => system.name)
    const trace = {
      x,
      y,
      z,
      text: name,
      textposition: 'top',
      mode: 'markers',
      marker: {
        color: 'rgb(255, 255, 255)',
        size: 2,
        line: {
          color: 'rgba(255, 255, 255, 0.14)',
          width: 0.5,
        },
        opacity: 0.8,
      },
      type: 'scatter3d',
    }
    const layout = {
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
      },
      showlegend: false,
      plot_bgcolor: '#000',
      paper_bgcolor: 'rgb(17 24 39)',
      scene: {
        camera: {
          center: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
    }

    const data: any[] = [trace]
    Plotly.newPlot('container', data, layout, { displaylogo: false })
  }, [systems])

  return <div id="container" ref={chartDiv} className="flex w-full min-h-full" />
}

export default MapV1
