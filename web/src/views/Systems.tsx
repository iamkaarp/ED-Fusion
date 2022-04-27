import React, { FC } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import SystemsTable from '../components/SystemsTable'

const Systems: FC = () => {
  const { page } = useParams<string>()
  const p = page ? parseInt(page) : 1
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Systems</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <SystemsTable page={p} />
      </div>
    </>
  )
}

export default Systems
