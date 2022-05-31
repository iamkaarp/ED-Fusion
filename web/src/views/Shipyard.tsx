import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import ShipyardTable from '../components/ShipyardTable'
import Ship from '../components/ShipyardTable/Ship'

const Shipyard: FC = () => {
  const { name } = useParams()
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Shipyard</title>
        <meta name="description" content="Ships in Elite: Dangerous" />
        <meta
          name="keywords"
          content="Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading, Ships"
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta name="twitter:title" content="Ships in Elite: Dangerous" />
        <meta
          name="twitter:description"
          content="Stations in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:title" content="Ships in Elite: Dangerous" />
        <meta
          property="og:description"
          content="Stations in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:url" content="https://ed-fusion.com/stations" />
        <meta property="og:site_name" content="Ships in Elite: Dangerous" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        {name ? <Ship name={name} /> : <ShipyardTable />}
      </div>
    </>
  )
}

export default Shipyard
