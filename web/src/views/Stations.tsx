import React, { FC } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import StationsTable from '../components/StationsTable'

const Stations: FC = () => {
  const { page } = useParams<string>()
  const p = page ? parseInt(page) : 1
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Stations</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <StationsTable page={p} />
      </div>
    </>
  )
}

export default Stations
