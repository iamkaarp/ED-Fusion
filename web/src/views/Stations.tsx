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
        <meta
          name="description"
          content="Stations in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta
          name="keywords"
          content="Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading"
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta name="twitter:title" content="ED-Fusion - Stations" />
        <meta
          name="twitter:description"
          content="Stations in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:title" content="ED-Fusion - Stations" />
        <meta
          property="og:description"
          content="Stations in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:url" content="https://ed-fusion.com/stations" />
        <meta property="og:site_name" content="ED-Fusion - Stations" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <StationsTable page={p} />
      </div>
    </>
  )
}

export default Stations
