import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import * as _ from 'lodash'

import System from '../../apis/System'
import DateFormat from '../../helpers/DateFormat'

import IStation from '../../interfaces/IStation'
import ISystem from '../../interfaces/ISystem'
import ISystemData from './interfaces/ISystemData'
import ISystemFaction from '../../interfaces/ISystemFaction'

import Loader from '../Loader/index'
import Stations from './Stations'
import Factions from './Factions'
import Bodies from './Bodies'
import Error from '../Error'

const SystemData: FC<ISystemData> = ({ name }) => {
  const [system, setSystem] = useState<ISystem>({} as ISystem)
  const [stations, setStations] = useState<IStation[]>([])
  const [factions, setFactions] = useState<ISystemFaction[]>([])
  const [error, setError] = useState<string>('')

  const [faction, setFaction] = useState<any>({})
  const [orbital, setOrbital] = useState<IStation[]>([])
  const [planetary, setPlanetary] = useState<IStation[]>([])
  const [fleetCarriers, setFleetCarriers] = useState<IStation[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [loadingOrbital, setLoadingOrbital] = useState<boolean>(true)
  const [loadingPlanetary, setLoadingPlanetary] = useState<boolean>(true)
  const [loadingFleetCarriers, setLoadingFleetCarriers] = useState<boolean>(true)

  const [stationTab, setStationTab] = useState<string>('orbital')

  const orbitalColumn = useSelector((state: any) => state.sort.orbital.column)
  const orbitalDirection = useSelector((state: any) => state.sort.orbital.direction)
  const planetaryColumn = useSelector((state: any) => state.sort.planetary.column)
  const planetaryDirection = useSelector((state: any) => state.sort.planetary.direction)
  const fleetCarriersColumn = useSelector((state: any) => state.sort.fleetCarriers.column)
  const fleetCarriersDirection = useSelector((state: any) => state.sort.fleetCarriers.direction)
  const dispatch = useDispatch()

  const { tab } = useParams()
  const activeTab = tab || 'system'

  const tabs = ['System', 'Factions', 'Bodies']

  const fetchStations = async (id: number) => {
    const res = await System.stations.index(id, 'updated_at', 'desc')
    setStations(res)
  }

  const fetchFactions = async (id: number) => {
    const res = await System.factions.index(id, 'influence', 'desc')
    setFactions(res)
  }

  const fetchData = _.memoize(async () => {
    const res = await System.show(name)
    setSystem(res)
    setLoading(false)
  })

  const fetchOrbital = _.memoize(async () => {
    setLoadingOrbital(true)
    const res = await System.stations.orbital(system.id, orbitalColumn, orbitalDirection)
    setOrbital(res)
    setLoadingOrbital(false)
  })

  const fetchPlanetary = _.memoize(async () => {
    setLoadingPlanetary(true)
    const res = await System.stations.planetary(system.id, planetaryColumn, planetaryDirection)
    setPlanetary(res)
    setLoadingPlanetary(false)
  })

  const fetchFleetCarriers = _.memoize(async () => {
    setLoadingFleetCarriers(true)
    const res = await System.stations.fleetCarriers(system.id, planetaryColumn, planetaryDirection)
    setFleetCarriers(res)
    setLoadingFleetCarriers(false)
  })

  const stationEconomies = (stations: IStation[]) => {
    const economies: string[] = []
    stations.forEach((station: IStation) => {
      station.economies.forEach((economy: any) => {
        if (!economies.includes(economy.economy.name)) {
          if (economy.economy.name !== system.primaryEconomy.name) {
            economies.push(economy.economy.name)
          }
        }
      })
    })
    return economies
  }

  const controllingFaction = (factions: any) => {
    factions.sort((a: any, b: any) => {
      return a.faction.influence < b.faction.influence ? 1 : -1
    })

    let factionState = 'None'

    if (factions[0].faction.state === '') {
      factionState = 'None'
    } else {
      factionState = factions[0].faction.state
    }

    return { factionName: factions[0].faction.name, factionState }
  }

  useEffect(() => {
    fetchData()
  }, [name])

  useEffect(() => {
    if (Object.keys(system).length > 0 && error.length === 0) {
      fetchStations(system.id)
      fetchFactions(system.id)
      fetchOrbital()
      fetchPlanetary()
      fetchFleetCarriers()
    }
  }, [system])

  useEffect(() => {
    if (factions) {
      if (factions.length > 0) {
        const { factionName, factionState } = controllingFaction(factions)
        setFaction({ name: factionName, state: factionState })
      }
    }
  }, [factions])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchOrbital()
    }
  }, [orbitalColumn, orbitalDirection])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchPlanetary()
    }
  }, [planetaryColumn, planetaryDirection])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchFleetCarriers()
    }
  }, [fleetCarriersColumn, fleetCarriersDirection])

  const onSort = (column: string, direction: string, type: String) => {
    dispatch({ type: 'sort/setColumn', payload: { type, column } })
    dispatch({ type: 'sort/setDirection', payload: { type, direction } })
  }

  const factionsData = (factions: ISystemFaction[]) => {
    return factions.filter((faction: any) => faction.faction.influence > 0)
  }

  return (
    <>
      <Helmet>
        <meta name="description" content={` System ${name} in Elite: Dangerous `} />
        <meta
          name="keywords"
          content={`Elite, Elite: Dangerous, Frontier, Frontier Development, Bodies, Systems, Stations, Market, Trading, Ships, ${name}`}
        />
        <meta name="twitter:site" content="@user" />
        <meta name="twitter:creator" content="@user" />
        <meta name="twitter:title" content={` System ${name} in Elite: Dangerous `} />
        <meta name="twitter:description" content={` System ${name} in Elite: Dangerous `} />
        <meta property="og:title" content={` System ${name} in Elite: Dangerous `} />
        <meta property="og:description" content={` System ${name} in Elite: Dangerous `} />
        <meta property="og:url" content={`https://ed-fusion.com/system/${name}}`} />
        <meta property="og:site_name" content={` System ${name} in Elite: Dangerous `} />
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
                <div className="flex items-center justify-between w-full pb-4 mb-4 border-b border-gray-700">
                  <h1 className="text-3xl">{name}</h1>
                  <p>{DateFormat.fromNow(system.updated_at)}</p>
                </div>
                <div className="w-full mb-4">
                  <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                      {tabs.map((tab: string, index: number) => (
                        <li key={index} className="mr-2">
                          <Link
                            to={
                              tab === 'System'
                                ? `/system/${name}`
                                : `/system/${name}/${tab.toLocaleLowerCase()}`
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
                {activeTab === 'system' && (
                  <>
                    <div className="w-full md:flex">
                      <div className="flex flex-col w-full pb-4 mb-4 border-b border-gray-400 md:mb-0 md:pb-0 md:w-1/2 md:border-0">
                        <h2 className="mb-8 text-xl font-bold text-center">System Information</h2>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Coordinates</div>
                          <div className="w-1/2 font-bold md:w-3/4">
                            {system.position.split(';').join(' / ')}
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Permit</div>
                          <div className="w-1/2 font-bold md:w-3/4">
                            {system.needs_permit ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">
                            Distance to Sol
                          </div>
                          <div className="w-1/2 font-bold md:w-3/4">
                            {system.distance.toLocaleString()} Ly
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Population</div>
                          <div className="w-1/2 font-bold md:w-3/4">
                            {system.population.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Economy</div>
                          <div className="w-1/2 font-bold md:w-3/4">
                            <>{system.primaryEconomy.name} </>
                            <>
                              {stations.length ? (
                                <>
                                  (
                                  {stationEconomies(stations).map((economy, index, row) => {
                                    if (index + 1 === row.length) {
                                      return <span key={economy}>{economy}</span>
                                    } else {
                                      return <span key={economy}>{economy}, </span>
                                    }
                                  })}
                                  )
                                </>
                              ) : (
                                ''
                              )}
                            </>
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Security</div>
                          <div className="w-1/2 font-bold md:w-3/4">{system.security.name}</div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Government</div>
                          <div className="w-1/2 font-bold md:w-3/4">{system.government.name}</div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Allegiance</div>
                          <div className="w-1/2 font-bold md:w-3/4">{system.allegiance.name}</div>
                        </div>
                        {factions.length ? (
                          <div className="flex w-full">
                            <div className="flex justify-end w-1/2 mr-4 md:w-1/4">Faction</div>
                            <div className="w-1/2 font-bold md:w-3/4">
                              <Link
                                className="hover:text-orange-400"
                                to={`/factions/${faction.name}`}
                              >
                                {faction.name}
                              </Link>{' '}
                              ({faction?.state})
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <h2 className="text-xl font-bold text-center">Minor Factions</h2>
                        <div className="flex justify-end w-full">
                          <Chart
                            type="bar"
                            datasetIdKey="id"
                            data={{
                              labels: factionsData(factions).map(
                                (faction: any) => faction.faction.name
                              ),
                              datasets: [
                                {
                                  label: 'Faction Influence',
                                  data: factionsData(factions).map(
                                    (faction: any) => faction.faction.influence * 100
                                  ),
                                  backgroundColor: ['#fb923c'],
                                  borderWidth: 1,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="flex flex-col w-full mt-12 mr-3">
                        {orbital.length || fleetCarriers.length ? (
                          <>
                            <div className="flex w-full">
                              {orbital.length ? (
                                <a
                                  onClick={(e: React.MouseEvent) => {
                                    e.preventDefault
                                    setStationTab('orbital')
                                  }}
                                  className={`text-xl font-bold cursor-pointer ${
                                    stationTab === 'orbital' ? 'text-orange-400' : ''
                                  } ${fleetCarriers.length ? 'mr-2' : ''}`}
                                >
                                  Orbital
                                </a>
                              ) : (
                                ''
                              )}
                              {planetary.length ? (
                                <a
                                  onClick={(e: React.MouseEvent) => {
                                    e.preventDefault
                                    setStationTab('planetary')
                                  }}
                                  className={`text-xl font-bold cursor-pointer ${
                                    stationTab === 'planetary' ? 'text-orange-400' : ''
                                  } ${planetary.length ? 'ml-2 mr-2' : ''}`}
                                >
                                  Planetary
                                </a>
                              ) : (
                                ''
                              )}
                              {fleetCarriers.length ? (
                                <a
                                  onClick={(e: React.MouseEvent) => {
                                    e.preventDefault
                                    setStationTab('fleetCarriers')
                                  }}
                                  className={`text-xl font-bold cursor-pointer ${
                                    stationTab === 'fleetCarriers' ? 'text-orange-400' : ''
                                  } ${fleetCarriers.length ? 'ml-2' : ''}`}
                                >
                                  Fleet Carriers
                                </a>
                              ) : (
                                ''
                              )}
                            </div>
                            {stationTab === 'orbital' && (
                              <Stations
                                stations={orbital}
                                loading={loadingOrbital}
                                column={orbitalColumn}
                                direction={orbitalDirection}
                                onSort={(column, direction) => {
                                  onSort(column, direction, 'orbital')
                                }}
                              />
                            )}
                            {stationTab === 'fleetCarriers' && (
                              <Stations
                                stations={fleetCarriers}
                                loading={loadingFleetCarriers}
                                column={fleetCarriersColumn}
                                direction={fleetCarriersDirection}
                                onSort={(column, direction) => {
                                  onSort(column, direction, 'fleetCarriers')
                                }}
                              />
                            )}
                            {stationTab === 'planetary' && (
                              <Stations
                                stations={planetary}
                                loading={loadingPlanetary}
                                column={planetaryColumn}
                                direction={planetaryDirection}
                                onSort={(column, direction) => {
                                  onSort(column, direction, 'planetary')
                                }}
                              />
                            )}
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === 'factions' && (
                  <>
                    <div className="flex flex-col w-full mt-12">
                      {factions.length ? (
                        <>
                          <Factions systemId={system.id} stations={stations} />
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          No Factions found
                        </div>
                      )}
                    </div>
                  </>
                )}
                {activeTab === 'bodies' && (
                  <>
                    <Bodies systemId={system.id} />
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

export default SystemData
