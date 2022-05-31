import React, { FC } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import BodyData from '../components/BodyData'

const System: FC = () => {
  const { name } = useParams<string>()
  const n = name || 'Sol'
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Body - {n}</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <BodyData name={n} />
      </div>
    </>
  )
}

export default System
