import React, { FC, useState, useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import * as _ from 'lodash'

import Loader from '../Loader'

import Station from '../../apis/Station'
import Discount from '../../apis/Discount'
import Service from '../../apis/Service'

import DateFormat from '../../helpers/DateFormat'
import getStationTypes from '../../helpers/StationTypes'
import Stations from '../../helpers/Stations'

import StationDataProps from './interfaces/StationData'
import IStation from '../../interfaces/IStation'
import IShipyard from '../../interfaces/IShipyard'
import IOutfitting from '../../interfaces/IOutfitting'
import IDiscount from '../../interfaces/IDiscount'
import IMarket from '../../interfaces/IMarket'
import IService from '../../interfaces/IService'

import Shipyard from './Shipyard'
import Outfitting from './Outfitting'
import Market from './Market'

import Error from '../Error'

const StationData: FC<StationDataProps> = ({ name }) => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMarket, setLoadingMarket] = useState<boolean>(true)
  const [loadingOutfitting, setLoadingOutfitting] = useState<boolean>(true)

  const [station, setStation] = useState<IStation>({} as IStation)
  const [ships, setShips] = useState<IShipyard[]>([])
  const [outfitting, setOutfitting] = useState<IOutfitting[]>([])
  const [discounts, setDiscounts] = useState<IDiscount[]>([])
  const [market, setMarket] = useState<IMarket[]>([])
  const [services, setServices] = useState<IService[]>([])

  const marketColumn = useSelector((state: any) => state.sort.market.column)
  const marketDirection = useSelector((state: any) => state.sort.market.direction)

  const outfittingColumn = useSelector((state: any) => state.sort.outfitting.column)
  const outfittingDirection = useSelector((state: any) => state.sort.outfitting.direction)

  const dispatch = useDispatch()
  const { tab } = useParams()
  const activeTab = tab || 'shipyard'

  const tabs = ['Shipyard', 'Outfitting', 'Market']

  const fetchStation = _.memoize(async () => {
    setLoading(true)
    const res = await Station.show(name)
    setStation(res)
    setLoading(false)
  })

  const fetchShips = _.memoize(async () => {
    const res = await Station.ships.index(station.id)
    setShips(res)
  })

  const fetchOutfitting = _.memoize(async () => {
    setLoadingOutfitting(true)
    const res = await Station.outfitting.index(station.id, outfittingColumn, outfittingDirection)
    setOutfitting(res)
    setLoadingOutfitting(false)
  })

  const fetchMarket = _.memoize(async () => {
    setLoadingMarket(true)
    const res = await Station.commodities.index(station.id, marketColumn, marketDirection)
    setMarket(res)
    setLoadingMarket(false)
  })

  const fetchDiscounts = _.memoize(async () => {
    const res = await Discount.find(station.system.name)
    setDiscounts(res)
  })

  const fetchServices = _.memoize(async () => {
    const res = await Service.index()
    const services = res
    setServices(services)
  })

  useEffect(() => {
    fetchStation()
  }, [name])

  useEffect(() => {
    if (Object.keys(station).length > 0) {
      fetchShips()
      fetchOutfitting()
      fetchDiscounts()
      fetchMarket()
      fetchServices()
    }
  }, [station])

  useEffect(() => {
    if (Object.keys(station).length > 0) {
      fetchMarket()
    }
  }, [marketColumn, marketDirection])

  useEffect(() => {
    if (Object.keys(station).length > 0) {
      fetchOutfitting()
    }
  }, [outfittingColumn, outfittingDirection])

  const onSort = (column: string, direction: string, type: String) => {
    dispatch({ type: 'sort/setColumn', payload: { type, column } })
    dispatch({ type: 'sort/setDirection', payload: { type, direction } })
  }

  return (
    <>
      <Helmet>
        <meta name="description" content={` Station ${name} in Elite: Dangerous `} />
        <meta
          name="keywords"
          content={`Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading, Ships, ${name}`}
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta name="twitter:title" content={` Station ${name} in Elite: Dangerous `} />
        <meta name="twitter:description" content={` Station ${name} in Elite: Dangerous `} />
        <meta name="twitter:image" content={`https://ed-fusion.com${Stations[station.type]}`} />
        <meta property="og:title" content={` Station ${name} in Elite: Dangerous `} />
        <meta property="og:description" content={` Station ${name} in Elite: Dangerous `} />
        <meta property="og:url" content={`https://ed-fusion.com/system/${name}}`} />
        <meta property="og:site_name" content={` Station ${name} in Elite: Dangerous `} />
        <meta property="og:image" content={`https://ed-fusion.com${Stations[station.type]}`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
      </Helmet>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {error.length > 0 ? (
            <div className="flex items-center justify-center w-full mt-48">
              <Error message={error} />
            </div>
          ) : (
            <>
              <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
                <div className="flex justify-between w-full pb-4 mb-4 border-b border-gray-700">
                  <h1 className="text-3xl">{name}</h1>
                  <p>{DateFormat.fromNow(station.updated_at)}</p>
                </div>
                <div className="w-full md:flex">
                  <div className="flex flex-col w-full pb-4 mb-4 border-b border-gray-400 md:mb-0 md:pb-0 md:w-1/2 md:border-0">
                    <h2 className="mb-8 text-xl font-bold text-center">Station Information</h2>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">System</div>
                      <div className="w-1/2 font-bold md:w-3/4">
                        <Link
                          className="hover:text-orange-400"
                          to={`/system/${station.system.name}`}
                        >
                          {station.system.name}
                        </Link>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">
                        Distance From arrival
                      </div>
                      <div className="w-1/2 font-bold md:w-3/4">
                        {station.distance_from_star.toLocaleString()} Ls
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Type</div>
                      <div className="w-1/2 font-bold md:w-3/4">
                        {getStationTypes(station.type)}
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Economy</div>
                      <div className="w-1/2 font-bold md:w-3/4">{station.economy.name}</div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Government</div>
                      <div className="w-1/2 font-bold md:w-3/4">{station.government.name}</div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Allegiance</div>
                      <div className="w-1/2 font-bold md:w-3/4">{station.allegiance.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <h2 className="mb-8 text-xl font-bold text-center">Station Services</h2>
                    <div className="flex flex-wrap w-full">
                      {station.services.map((service) => {
                        return (
                          <Fragment key={service.name}>
                            {service.service && (
                              <div className="w-1/2 mb-4 md:w-1/4 md:mb-0">
                                {service.service.name}
                              </div>
                            )}
                          </Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-full mt-8 mb-4">
                  <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                      {tabs.map((tab: string, index: number) => (
                        <li key={index} className="mr-2">
                          <Link
                            to={
                              tab === 'Shipyard'
                                ? `/station/${name}`
                                : `/station/${name}/${tab.toLocaleLowerCase()}`
                            }
                            className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-gray-300 hover:text-gray-300 ${
                              tab.toLocaleLowerCase() === activeTab
                                ? 'border-orange-400 text-orange-400'
                                : ''
                            }`}
                          >
                            {tab}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex w-full" />
                {activeTab === 'shipyard' && (
                  <>
                    <Shipyard discount={discounts} ships={ships} />
                  </>
                )}
                {activeTab === 'outfitting' && (
                  <>
                    <Outfitting
                      onSort={(column, direction) => {
                        onSort(column, direction, 'outfitting')
                      }}
                      loading={loadingOutfitting}
                      column={outfittingColumn}
                      direction={outfittingDirection}
                      modules={outfitting}
                    />
                  </>
                )}
                {activeTab === 'market' && (
                  <>
                    <Market
                      onSort={(column, direction) => {
                        onSort(column, direction, 'market')
                      }}
                      loading={loadingMarket}
                      column={marketColumn}
                      direction={marketDirection}
                      commodities={market}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default StationData
