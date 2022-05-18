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
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        {name ? <Ship name={name} /> : <ShipyardTable />}
      </div>
    </>
  )
}

export default Shipyard
