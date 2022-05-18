import React, { FC } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import StationData from '../components/StationData'

const Station: FC = () => {
  const { name } = useParams<string>()
  const n = name || 'Sol'
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Station - {n}</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <StationData name={n} />
      </div>
    </>
  )
}

export default Station
