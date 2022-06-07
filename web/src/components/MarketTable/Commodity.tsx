import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import Market from '../../apis/Market'
import System from '../../apis/System'

import DateFormat from '../../helpers/DateFormat'

import ICommodity from '../../interfaces/ICommodity'
import ISystem from '../../interfaces/ISystem'
import IStationCommodity from '../../interfaces/IStationCommodity'

import Loader from '../Loader'
import Table from '../Table'

interface CommodityProps {
  name: string
}

interface Filters {
  showFc: boolean
  showPlanetary: boolean
  minSupply: number
}

const Commodity: FC<CommodityProps> = ({ name }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMin, setLoadingMin] = useState<boolean>(true)
  const [loadingMax, setLoadingMax] = useState<boolean>(true)
  const [commodity, setCommodity] = useState<ICommodity>({} as any)
  const [stationCommoditiesMinBuy, setStationCommoditiesMinBuy] = useState<IStationCommodity[]>([])
  const [stationCommoditiesMaxSell, setStationCommoditiesMaxSell] = useState<IStationCommodity[]>(
    []
  )
  const [stationCommoditiesMin, setStationCommoditiesMin] = useState<IStationCommodity>(
    {} as IStationCommodity
  )
  const [stationCommoditiesMax, setStationCommoditiesMax] = useState<IStationCommodity>(
    {} as IStationCommodity
  )
  const [filters, setFilters] = useState<Filters>({} as Filters)
  const [systems, setSystems] = useState<ISystem[]>([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [system, setSystem] = useState<string>('')
  const [minSupply, setMinSupply] = useState<number>(0)
  const refSystem = useSelector((state: any) => state.refSystem.system)
  const dispatch = useDispatch()

  const fetchCommodity = _.memoize(async () => {
    setLoading(true)
    const res = await Market.show(name)
    setCommodity(res)
    setLoading(false)
  })

  const fetchStationsMinBuy = _.memoize(async () => {
    setLoadingMin(true)
    const res = await Market.stations.index(commodity.key, {
      min: true,
      ref: refSystem,
      ...filters,
    })
    setStationCommoditiesMinBuy(res)
    setLoadingMin(false)
  })

  const fetchStationsMaxSell = _.memoize(async () => {
    setLoadingMax(true)
    const res = await Market.stations.index(commodity.key, {
      max: true,
      ref: refSystem,
      ...filters,
    })
    setStationCommoditiesMaxSell(res)
    setLoadingMax(false)
  })

  const fetchMin = _.memoize(async () => {
    const res = await Market.stations.min(commodity.key, {
      ...filters,
    })
    setStationCommoditiesMin(res)
  })

  const fetchMax = _.memoize(async () => {
    const res = await Market.stations.max(commodity.key, {
      ...filters,
    })
    setStationCommoditiesMax(res)
  })

  const fetchSystems = _.memoize(async (query: string) => {
    const res = await System.find(query)
    setSystems(res)
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystem(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<any>) => {
    let index = 0
    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex >= systems.length - 1) {
        index = 0
      } else {
        index = activeSuggestionIndex + 1
      }
    }

    if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex <= 0) {
        index = systems.length - 1
      } else {
        index = activeSuggestionIndex - 1
      }
    }
    setActiveSuggestionIndex(index)

    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }

    if (e.key === 'Enter') {
      const system = systems.filter(
        (system) => system.name === systems[activeSuggestionIndex].name
      )[0]
      setShowSuggestions(false)
      setSystem(system.name)
      dispatch({ type: 'refSystem/set', payload: { system: system.name } })
    }
  }

  const onClick = (e: React.MouseEvent<any>) => {
    const target = e.target as HTMLLIElement
    const system = systems.filter((system) => system.name === target.outerText)[0]
    setSystem(system.name)
    dispatch({ type: 'refSystem/set', payload: { system: system.name } })
    setShowSuggestions(false)
  }

  const onFilter = (value: string, item: string = '') => {
    let f = { ...filters }
    switch (value) {
      case 'showFc':
        f = { ...f, showFc: !filters.showFc }
        break
      case 'showPlanetary':
        f = { ...f, showPlanetary: !filters.showPlanetary }
        break
      case 'minSupply':
        setMinSupply(Number(item))
        f = { ...f, minSupply: Number(item) !== 0 ? Number(item) : 0 }
    }
    setFilters(f)
  }

  useEffect(() => {
    fetchCommodity()
  }, [])

  useEffect(() => {
    if (Object.keys(commodity).length > 0) {
      fetchStationsMinBuy()
      fetchStationsMaxSell()
      fetchMin()
      fetchMax()
    }
  }, [commodity, filters, refSystem])

  useEffect(() => {
    if (system.length >= 2) {
      fetchSystems(system)
    } else {
      setSystems([])
    }
  }, [system])

  const thBuy = [
    {
      name: 'Station',
      sort: 'name',
      sortable: false,
      mobile: true,
    },
    {
      name: 'System',
      sort: 'systems.name',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Buy',
      sort: 'buy_price',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Supply',
      sort: 'stock',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Pad',
      sort: 'pad',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Distance Sol',
      sort: 'distance',
      sortable: false,
      mobile: false,
    },
    {
      name: `Dist. Ref (${refSystem})`,
      sort: 'distance',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Updated',
      sort: 'updated_at',
      sortable: false,
      mobile: true,
    },
  ]

  const thSell = [
    {
      name: 'Station',
      sort: 'name',
      sortable: false,
      mobile: true,
    },
    {
      name: 'System',
      sort: 'systems.name',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Sell',
      sort: 'sell_price',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Demand',
      sort: 'demand',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Pad',
      sort: 'pad',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Distance Sol',
      sort: 'distance',
      sortable: false,
      mobile: false,
    },
    {
      name: `Dist. Ref (${refSystem})`,
      sort: 'distance',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Updated',
      sort: 'updated_at',
      sortable: false,
      mobile: true,
    },
  ]

  return (
    <>
      <Helmet>
        <title>ED-Fusion - Market - {name}</title>
        <meta
          name="description"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
        <meta
          name="keywords"
          content={`Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading, Ships, ${name}`}
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta
          name="twitter:title"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
        <meta
          name="twitter:description"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
        <meta
          property="og:title"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
        <meta
          property="og:description"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
        <meta property="og:url" content={`https://ed-fusion.com/market/${name}}`} />
        <meta
          property="og:site_name"
          content={`Commodity ${name} in Elite: Dangerous - Find the best buying and selling stations`}
        />
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
        <div className="w-full p-2 mb-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md md:p-6">
          <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-gray-700">
            <h1 className="text-3xl">{name}</h1>
            <p>{DateFormat.fromNow(commodity.updated_at)}</p>
          </div>
          <div className="w-full md:flex">
            <div className="flex flex-col w-full pb-4 mb-4 border-b border-gray-400 md:mb-0 md:pb-0 md:w-1/2 md:border-0">
              <h2 className="mb-8 text-xl font-bold text-center" />
              <div className="flex w-full">
                <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Average Sell Price</div>
                <div className="w-1/2 font-bold md:w-3/4">
                  {commodity.avg_sell.toLocaleString()} Cr
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Average Buy Price</div>
                <div className="w-1/2 font-bold md:w-3/4">
                  {commodity.avg_buy.toLocaleString()} Cr
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Maximum Sell Price</div>
                <div className="w-1/2 font-bold md:w-3/4">
                  {Object.keys(stationCommoditiesMax).length > 0 ? (
                    <>
                      {stationCommoditiesMax.sell_price.toLocaleString()} Cr -{' '}
                      <Link
                        className="hover:text-orange-400"
                        to={`/station/${stationCommoditiesMax.station.name}`}
                      >
                        {stationCommoditiesMax.station.name}
                      </Link>{' '}
                      -&gt;{' '}
                      <Link
                        className="hover:text-orange-400"
                        to={`/system/${stationCommoditiesMax.station.system.name}`}
                      >
                        {stationCommoditiesMax.station.system.name}
                      </Link>
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Minimum Buy Price</div>
                <div className="w-1/2 font-bold md:w-3/4">
                  {Object.keys(stationCommoditiesMin).length > 0 ? (
                    <>
                      {stationCommoditiesMin.buy_price.toLocaleString()} Cr -{' '}
                      <Link
                        className="hover:text-orange-400"
                        to={`/station/${stationCommoditiesMin.station.name}`}
                      >
                        {stationCommoditiesMin.station.name}
                      </Link>{' '}
                      -&gt;{' '}
                      <Link
                        className="hover:text-orange-400"
                        to={`/system/${stationCommoditiesMin.station.system.name}`}
                      >
                        {stationCommoditiesMin.station.system.name}
                      </Link>
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Maxium Profit</div>
                <div className="w-1/2 font-bold md:w-3/4">
                  {Object.keys(stationCommoditiesMin).length > 0 &&
                  Object.keys(stationCommoditiesMax).length > 0 ? (
                    <>
                      {(
                        stationCommoditiesMax.sell_price - stationCommoditiesMin.buy_price
                      ).toLocaleString()}{' '}
                      Cr
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full pb-4 mb-4 border-b border-gray-400 md:mb-0 md:pb-0 md:w-1/2 md:border-0">
              <div className="w-full mb-4">
                <div className="autocomplete">
                  <div>
                    <label
                      htmlFor="system"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Current System
                    </label>
                    <input
                      type="text"
                      id="system"
                      className={`auto-input ${
                        showSuggestions && system ? 'rounded-t-lg' : 'rounded-lg'
                      }`}
                      placeholder={refSystem}
                      onChange={(e) => onChange(e)}
                      onFocus={() => setShowSuggestions(true)}
                      value={system}
                      onKeyDown={onKeyDown}
                    />
                    {systems.length > 0 && showSuggestions && (
                      <ul className="suggestions">
                        {systems.map((system, index) => {
                          let className = 'cursor-pointer'
                          // Flag the active suggestion with a class
                          if (index === activeSuggestionIndex) {
                            className = 'cursor-pointer suggestion-active'
                          }
                          return (
                            <li
                              id={`suggestion-${system.id}`}
                              className={className}
                              key={system.id}
                              onClick={onClick}
                            >
                              {system.name}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/2 mb-4">
                <div>
                  <label
                    htmlFor="fleetCarriers"
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      onChange={() => onFilter('showFc')}
                      type="checkbox"
                      value=""
                      id="fleetCarriers"
                      className="sr-only peer"
                      checked={filters.showFc}
                    />
                    <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:trangray-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-orange-400" />
                    <span className="ml-3 text-sm font-medium text-gray-300">
                      Include Fleet Carriers
                    </span>
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="planetary"
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      onChange={() => onFilter('showPlanetary')}
                      type="checkbox"
                      value=""
                      id="planetary"
                      className="sr-only peer"
                      checked={filters.showPlanetary}
                    />
                    <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:trangray-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-orange-400" />
                    <span className="ml-3 text-sm font-medium text-gray-300">
                      Include Planetary
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-1/2 mb-4">
                <label htmlFor="system" className="block mb-2 text-sm font-medium text-gray-300">
                  Min Supply
                </label>
                <input
                  type="number"
                  id="system"
                  className="rounded-lg auto-input"
                  placeholder="0"
                  onChange={(e) => onFilter('minSupply', e.currentTarget.value)}
                  value={minSupply}
                />
              </div>
            </div>
          </div>
          <div className="flex-col w-full mt-4 md:flex">
            <div className="w-full mb-2">
              <h2 className="mb-2 text-xl font-bold">Buy From</h2>
              <div className="relative overflow-x-auto shadow-md min-h-[16rem] sm:rounded-lg">
                <Table
                  th={thBuy}
                  loading={loadingMin}
                  onSort={() => {}}
                  column={''}
                  direction={'desc'}
                >
                  {stationCommoditiesMinBuy.map((commodity: IStationCommodity) => {
                    return (
                      <tr
                        key={commodity.id}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="font-medium px-1.5 py-2 md:px-6 md:py-4 text-white whitespace-nowrap"
                        >
                          <Link
                            to={`/station/${commodity.station.name}`}
                            className="hover:text-orange-400"
                          >
                            {commodity.station.name}
                          </Link>
                        </th>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          <Link
                            to={`/system/${commodity.station.system.name}`}
                            className="hover:text-orange-400"
                          >
                            {commodity.station.system.name}
                          </Link>
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.buy_price.toLocaleString()} Cr
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.stock}
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.station.max_landing_pad_size}
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.station.system.distance} Ly
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.meta.distance} Ly
                        </td>
                        <td className="px-1.5 py-2 md:table-cell">
                          {DateFormat.fromNow(commodity.updated_at)}
                        </td>
                      </tr>
                    )
                  })}
                </Table>
              </div>
            </div>
            <div className="w-full mt-2">
              <h2 className="mb-2 text-xl font-bold">Sell To</h2>
              <div className="relative min-h-[16rem] overflow-x-auto shadow-md sm:rounded-lg">
                <Table
                  th={thSell}
                  loading={loadingMax}
                  onSort={() => {}}
                  column={''}
                  direction={'desc'}
                >
                  {stationCommoditiesMaxSell.map((commodity: IStationCommodity) => {
                    return (
                      <tr
                        key={commodity.id}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="font-medium px-1.5 py-2 md:px-6 md:py-4 text-white whitespace-nowrap"
                        >
                          <Link
                            to={`/station/${commodity.station.name}`}
                            className="hover:text-orange-400"
                          >
                            {commodity.station.name}
                          </Link>
                        </th>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          <Link
                            to={`/system/${commodity.station.system.name}`}
                            className="hover:text-orange-400"
                          >
                            {commodity.station.system.name}
                          </Link>
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.sell_price > commodity.buy_price ? (
                            <span className="text-green-400">
                              {commodity.sell_price.toLocaleString()} Cr
                            </span>
                          ) : (
                            <>{commodity.sell_price.toLocaleString()} Cr</>
                          )}
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.stock}
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.station.max_landing_pad_size}
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.station.system.distance} Ly
                        </td>
                        <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                          {commodity.meta.distance} Ly
                        </td>
                        <td className="px-1.5 py-2 md:table-cell">
                          {DateFormat.fromNow(commodity.updated_at)}
                        </td>
                      </tr>
                    )
                  })}
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Commodity
