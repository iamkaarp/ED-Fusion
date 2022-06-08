import React, { Fragment, FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'
import Icon from '@mdi/react'
import { mdiChevronUp } from '@mdi/js'

import DateFormat from '../../helpers/DateFormat'
import getHappiness from '../../helpers/Happiness'
import System from '../../apis/System'

import ISystemFactions from './interfaces/ISystemFactions'

import Table from '../Table/index'
import IStation from '../../interfaces/IStation'
import ISystemFaction from '../../interfaces/ISystemFaction'

const Factions: FC<ISystemFactions> = ({ systemId, stations }) => {
  const [open, setOpen] = useState<any[]>([])
  const [factions, setFactions] = useState<ISystemFaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const column = useSelector((state: any) => state.sort.factions.column)
  const direction = useSelector((state: any) => state.sort.factions.direction)
  const dispatch = useDispatch()

  const onSort = (column: string, direction: string) => {
    dispatch({ type: 'sort/setColumn', payload: { type: 'factions', column } })
    dispatch({ type: 'sort/setDirection', payload: { type: 'factions', direction } })
  }

  const fetchFactions = _.memoize(async () => {
    setLoading(true)
    const factions = await System.factions.index(systemId, column, direction)
    setFactions(factions)
    setLoading(false)
  })

  useEffect(() => {
    fetchFactions()
  }, [column, direction])

  const th = [
    {
      name: 'Faction',
      sort: 'factions.name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Influence',
      sort: 'factions.influence',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Happiness',
      sort: 'happiness',
      sortable: false,
      mobile: false,
    },
    {
      name: 'Alignment',
      sort: 'super_powers.name',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Government',
      sort: 'governments.name',
      sortable: true,
      mobile: false,
    },
    {
      name: 'State',
      sort: 'state',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Updated',
      sort: 'factions.updated_at',
      sortable: true,
      mobile: true,
    },
    {
      name: '',
      sortable: false,
      mobile: false,
    },
  ]

  const openFactionInfo = (id: number) => {
    const row = document.getElementById(`faction-row-${id}`)
    row?.classList.toggle('hidden')
    if (open.includes(id)) {
      setOpen(open.filter((item: number) => item !== id))
      return
    }
    setOpen([...open, id])
  }
  const filterStations = (faction: ISystemFaction): IStation[] => {
    return stations.filter(
      (station: IStation) =>
        station.faction && station.faction.faction.name === faction.faction.name
    )
  }

  const activeStates = (faction: ISystemFaction): string[] => {
    if (faction.faction.active_states.length === 0) {
      return ['']
    }

    if (!faction.faction.active_states.includes(';')) {
      return [faction.faction.active_states]
    }

    const states = faction.faction.active_states.split(';')
    return states
  }

  const recoveringStates = (faction: ISystemFaction): string[] => {
    if (faction.faction.recovering_states.length === 0) {
      return ['']
    }

    if (!faction.faction.recovering_states.includes(';')) {
      return [faction.faction.recovering_states]
    }

    const states = faction.faction.recovering_states.split(';')
    return states
  }

  const pendingStates = (faction: ISystemFaction): string[] => {
    if (faction.faction.pending_states.length === 0) {
      return ['']
    }

    if (!faction.faction.pending_states.includes(';')) {
      return [faction.faction.pending_states]
    }

    const states = faction.faction.pending_states.split(';')
    return states
  }

  return (
    <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
      <Table th={th} loading={loading} onSort={onSort} column={column} direction={direction}>
        {factions.map((faction: any) => {
          return (
            <Fragment key={faction.id}>
              <tr
                onClick={() => {
                  openFactionInfo(faction.id)
                }}
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                >
                  <Link to={`/faction/${faction.faction.name}`} className="hover:text-orange-400">
                    {faction.faction.name}
                  </Link>
                </th>
                <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                  {Math.round(faction.faction.influence * 100)} %
                </td>
                <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                  {faction.faction.happiness !== '' ? getHappiness(faction.faction.happiness) : ''}
                </td>
                <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                  {faction.faction.allegiance.name}
                </td>
                <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                  {faction.faction.government.name}
                </td>
                <td className="px-1.5 py-2 md:px-6 md:py-4">
                  {faction.faction.state.match(/[A-Z][a-z]+/g)?.join(' ')}
                </td>
                <td className="px-1.5 py-2 md:px-6 md:py-4">
                  {DateFormat.fromNow(faction.faction.updated_at)}
                </td>
                <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                  {filterStations(faction).length > 0 && (
                    <Icon
                      path={mdiChevronUp}
                      rotate={open.includes(faction.id) ? 180 : 0}
                      size={1}
                    />
                  )}
                </td>
              </tr>
              {filterStations(faction).length > 0 && (
                <tr
                  className="hidden border-b border-gray-700 faction-info"
                  id={`faction-row-${faction.id}`}
                >
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col w-full md:justify-between md:flex-row">
                      <div className="flex-col">
                        <p className="mb-3 text-lg font-bold">Stations</p>
                        {filterStations(faction).map((station: IStation) => (
                          <Link
                            key={station.id}
                            to={`/station/${station.name}`}
                            className="hover:text-orange-400"
                          >
                            <p>{station.name}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="flex-col">
                        <p className="mb-3 text-lg font-bold">State</p>
                        {faction.faction.state.match(/[A-Z][a-z]+/g)?.join(' ')}
                      </div>
                      <div className="flex-col">
                        <p className="mb-3 text-lg font-bold">Active States</p>
                        {activeStates(faction).map((state: string, index: number) => (
                          <p key={index}>{state.match(/[A-Z][a-z]+/g)?.join(' ')}</p>
                        ))}
                      </div>
                      <div className="flex-col">
                        <p className="mb-3 text-lg font-bold">Recovering States</p>
                        {recoveringStates(faction).map((state: string, index: number) => (
                          <p key={index}>{state.match(/[A-Z][a-z]+/g)?.join(' ')}</p>
                        ))}
                      </div>
                      <div className="flex-col">
                        <p className="mb-3 text-lg font-bold">Pending States</p>
                        {pendingStates(faction).map((state: string, index: number) => (
                          <p key={index}>{state.match(/[A-Z][a-z]+/g)?.join(' ')}</p>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          )
        })}
      </Table>
    </div>
  )
}

export default Factions
