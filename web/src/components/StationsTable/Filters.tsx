import React, { FC, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'

import IFiltersProps from './interfaces/IFiltersProps'
import ICommodity from '../../interfaces/ICommodity'

import KeyName from '../../interfaces/KeyName'

import Service from '../../apis/Service'
import Market from '../../apis/Market'
import Station from '../../apis/Station'
import Outfitting from '../../apis/Outfitting'
import Shipyard from '../../apis/Shipyard'

import Autocomplete from '../Forms/Autocomplete'
import Toggle from '../Forms/Toggle'

import './css/Filter.scss'
import getStationType from '../../helpers/StationTypes'

interface Service {
  id: number
  shown: boolean
  name: string
  key: string
}

interface Commodity extends KeyName {
  commodity_id: number
}

interface Type {
  id: string
  name: string
}

interface Module {
  id: string
  name: string
  key: string
}

interface Ship extends KeyName {}

const Filters: FC<IFiltersProps> = ({ onFilter, filters }) => {
  const [services, setServices] = useState<Service[]>([])
  const [commodities, setCommodities] = useState<ICommodity[]>([])
  const [types, setTypes] = useState<Type[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [ships, setShips] = useState<Ship[]>([])

  const fetchServices = _.memoize(async () => {
    const res = await Service.index()
    setServices(res)
  })

  const fetchCommodities = _.memoize(async () => {
    const res = await Market.index('name', 'asc')
    setCommodities(res)
  })

  const fetchTypes = _.memoize(async () => {
    const res = await Station.types()
    const types = res
      .filter((type: any) => type.type !== '')
      .map((type: any) => {
        return { id: uuidv4(), name: getStationType(type.type), key: type.type }
      })
    setTypes(types)
  })

  const fetchModules = _.memoize(async () => {
    const res = await Outfitting.index()
    const modules = res.map((module: any) => {
      return {
        id: uuidv4(),
        name: `${module.class}${module.rating} ${module.name}`,
        key: module.key,
      }
    })
    setModules(modules)
  })

  const fetchShips = _.memoize(async () => {
    const res = await Shipyard.index()
    setShips(res)
  })

  useEffect(() => {
    fetchServices()
    fetchCommodities()
    fetchTypes()
    fetchModules()
    fetchShips()
  }, [])

  const onServiceChange = (serviceItems: any[]): void => {
    onFilter('services', serviceItems)
  }

  const onCommodityChange = (commodityItem: any[]): void => {
    onFilter('commodities', commodityItem)
  }

  const onTypeChange = (type: any[]): void => {
    onFilter('types', type)
  }

  const onModuleChange = (module: any[]): void => {
    onFilter('modules', module)
  }

  const onShipChange = (ship: any[]): void => {
    onFilter('ships', ship)
  }

  const onDistanceChange = _.debounce((value: number): void => {
    onFilter('arrival', [value])
  }, 500)

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="flex md:w-1/3 md:mr-2">
        <div className="w-full">
          <div className="mt-3">
            <Toggle
              onChange={() => onFilter('showFc')}
              checked={filters.showFc}
              label="Include Fleet Carriers"
            />
          </div>
          <div className="mt-3">
            <Toggle
              onChange={() => onFilter('showPlanetary')}
              checked={filters.showPlanetary}
              label="Include Planetary"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-300">
            Max Distance to Arrival
          </label>
          <input
            type="number"
            id="arrival"
            onChange={(e) => onDistanceChange(Number(e.target.value))}
            className="filter-input"
            placeholder="ls"
          />
        </div>
      </div>
      <div className="md:w-1/3 md:mr-2 md:ml-2">
        <div className="">
          <Autocomplete
            onItemsChange={onTypeChange}
            items={types}
            placeholder="Orbis"
            title="Station Type"
          />
        </div>
        <div className="mt-4">
          <Autocomplete
            onItemsChange={onServiceChange}
            items={services}
            placeholder="Outfitting"
            title="Station Services"
          />
        </div>
      </div>
      <div className="md:w-1/3 md:ml-2">
        <div className="mt-4 md:mt-0">
          <Autocomplete
            onItemsChange={onCommodityChange}
            items={commodities}
            placeholder="Gold"
            title="Sells Commodities"
          />
        </div>
        <div className="mt-4">
          <Autocomplete
            onItemsChange={onModuleChange}
            items={modules}
            placeholder="6A Fuel Scoop"
            title="Sells Modules"
          />
        </div>
        <div className="mt-4">
          <Autocomplete
            onItemsChange={onShipChange}
            items={ships}
            placeholder="Diamondback Explorer"
            title="Sells Ships"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
