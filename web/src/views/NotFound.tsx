import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const NotFound: FC = () => {
  return (
    <>
      <Helmet>
        <title>ED-Fusion - Page not found</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
          <div className="flex justify-center w-full">
            <p className="text-3xl">The page you are looking for does not exist.</p>
          </div>
          <div className="flex justify-between w-full my-12">
            <Link to="/systems" className="hover:text-orange-400">
              Systems
            </Link>
            <Link to="/stations" className="hover:text-orange-400">
              Stations
            </Link>
            <Link to="/factions" className="hover:text-orange-400">
              Factions
            </Link>
            <Link to="/bodies" className="hover:text-orange-400">
              Bodies
            </Link>
            <Link to="/market" className="hover:text-orange-400">
              Market
            </Link>
            <Link to="/shipyard" className="hover:text-orange-400">
              Shipyard
            </Link>
            <Link to="/outfitting" className="hover:text-orange-400">
              Outfitting
            </Link>
            <Link to="/map" className="hover:text-orange-400">
              Map
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
