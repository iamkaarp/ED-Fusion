import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import UserSettings from '../components/Settings'

const Settings: FC = () => {
  return (
    <>
      <Helmet>
        <title>ED-Fusion - User Settings</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <UserSettings />
      </div>
    </>
  )
}

export default Settings
