import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import MarketTable from '../components/MarketTable'
import Commodity from '../components/MarketTable/Commodity'

const Market: FC = () => {
  const { name } = useParams()
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Market</title>
        <meta
          name="description"
          content="Market in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta
          name="keywords"
          content="Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading"
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta name="twitter:title" content="ED-Fusion - Market" />
        <meta
          name="twitter:description"
          content="Market in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:title" content="ED-Fusion - Market" />
        <meta
          property="og:description"
          content="Market in Elite: Dangerous - Search, filter, find and sort"
        />
        <meta property="og:url" content="https://ed-fusion.com/market" />
        <meta property="og:site_name" content="ED-Fusion - Market" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        {name ? <Commodity name={name} /> : <MarketTable />}
      </div>
    </>
  )
}

export default Market
