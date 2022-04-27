import React, { FC } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import SystemData from '../components/SystemData'

const System: FC = () => {
  const { name } = useParams<string>()
  const n = name || 'Sol'
  return (
    <>
      <Helmet>
        <title>ED-Fusion - System - {n}</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <SystemData name={n} />
      </div>
    </>
  )
}

export default System
