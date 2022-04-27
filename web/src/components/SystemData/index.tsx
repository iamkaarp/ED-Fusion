import React, { FC, useState, useEffect, useCallback } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import _debounce from 'lodash/debounce'

import EDFusion from '../../apis/EDFusion'

import IStation from '../../interfaces/IStation'
import ISystem from '../../interfaces/ISystem'
import ISystemData from './interfaces/ISystemData'

import Loader from '../Loader/index'
import Stations from './Stations'
import Factions from './Factions'
import IFactions from '../../interfaces/IFactions'
import IFaction from '../../interfaces/IFaction'

const SystemData: FC<ISystemData> = ({ name }) => {
  const [system, setSystem] = useState<ISystem>({} as ISystem)
  const [stations, setStations] = useState<IStation[]>([])
  const [factions, setFactions] = useState<IFaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [faction, setFaction] = useState<any>({})

  const [stationColumn, setStationColumn] = useState<string>('distance_from_star')
  const [stationDirection, setStationDirection] = useState<string>('asc')
  const [stationLoading, setStationLoading] = useState<boolean>(true)

  const [factionColumn, setFactionColumn] = useState<string>('influence')
  const [factionDirection, setFactionDirection] = useState<string>('desc')
  const [factionLoading, setFactionLoading] = useState<boolean>(true)

  const fetchDataFn = async () => {
    const res = await EDFusion.systems.get(name)
    setSystem(res)
    setLoading(false)
  }

  const fetchStations = async (id: number) => {
    setStationLoading(true)
    const res = await EDFusion.systems.stations(id, stationColumn, stationDirection)
    setStations(res)
    setStationLoading(false)
  }

  const fetchFactions = async (id: number) => {
    const res = await EDFusion.systems.factions(id, 'influence', 'asc')
    setFactions(res)
  }

  const fetchData = useCallback(_debounce(fetchDataFn, 250), [])

  const stationEconomies = (stations: any) => {
    const economies: any[] = []
    stations.forEach((station: any) => {
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

  const sortStation = (column: string, direction: string) => {
    setStationColumn(column)
    setStationDirection(direction)
  }

  useEffect(() => {
    fetchData()
  }, [name])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchStations(system.id)
      fetchFactions(system.id)
    }
  }, [system])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchStations(system.id)
    }
  }, [stationColumn, stationDirection])

  useEffect(() => {
    if (Object.keys(system).length > 0) {
      fetchFactions(system.id)
    }
  }, [factionColumn, factionDirection])

  useEffect(() => {
    if (factions) {
      if (factions.length > 0) {
        const { factionName, factionState } = controllingFaction(factions)
        setFaction({ name: factionName, state: factionState })
      }
    }
  }, [factions])

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full p-6 text-gray-400 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
            <div className="w-full pb-4 mb-4 border-b border-gray-700">
              <h1 className="text-3xl">{name}</h1>
            </div>
            <div className="flex w-full">
              <div className="flex flex-col w-1/2">
                <h2 className="mb-8 text-xl font-bold text-center">System Information</h2>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Coordinates</div>
                  <div className="w-3/4 font-bold">{system.position.split(';').join(' / ')}</div>
                </div>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Distance to Sol</div>
                  <div className="w-3/4 font-bold">{system.distance.toLocaleString()} Ly</div>
                </div>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Population</div>
                  <div className="w-3/4 font-bold">{system.population.toLocaleString()}</div>
                </div>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Economy</div>
                  <div className="w-3/4 font-bold">
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
                  <div className="flex justify-end w-1/4 mr-4">Security</div>
                  <div className="w-3/4 font-bold">{system.security.name}</div>
                </div>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Government</div>
                  <div className="w-3/4 font-bold">{system.government.name}</div>
                </div>
                <div className="flex w-full">
                  <div className="flex justify-end w-1/4 mr-4">Allegiance</div>
                  <div className="w-3/4 font-bold">{system.allegiance.name}</div>
                </div>
                {factions.length ? (
                  <div className="flex w-full">
                    <div className="flex justify-end w-1/4 mr-4">Faction</div>
                    <div className="w-3/4 font-bold">
                      {faction.name} ({faction?.state})
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <h2 className="text-xl font-bold text-center">Minor Factions</h2>
                <div className="flex justify-end w-full">
                  <Chart
                    type="bar"
                    datasetIdKey="id"
                    data={{
                      labels: factions.map((faction: any) => faction.faction.name),
                      datasets: [
                        {
                          label: 'Faction Influence',
                          data: factions.map((faction: any) => faction.faction.influence * 100),
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
            <div className="flex flex-col w-full mt-12">
              <div className="w-full">
                {stations.length ? (
                  <>
                    <h2 className="text-xl font-bold text-center">Stations</h2>
                    <Stations
                      onSort={(column, direction) => {
                        sortStation(column, direction)
                      }}
                      loading={stationLoading}
                      column={stationColumn}
                      direction={stationDirection}
                      stations={stations}
                    />
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="flex flex-col w-full mt-12">
                {factions.length ? (
                  <>
                    <h2 className="text-xl font-bold text-center">Factions</h2>
                    <Factions
                      onSort={(column, direction) => {
                        sortStation(column, direction)
                      }}
                      loading={stationLoading}
                      column={stationColumn}
                      direction={stationDirection}
                      factions={factions}
                      stations={stations}
                    />
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SystemData
