import React, { FC, useEffect, useState } from 'react'
import * as _ from 'lodash'

import Security from '../../apis/Security'
import Economy from '../../apis/Economy'
import Allegiance from '../../apis/Allegiance'
import Government from '../../apis/Government'

import IFiltersProps from './interfaces/IFiltersProps'
import IGovernment from '../../interfaces/IGovernment'
import IAllegiance from '../../interfaces/IAllegiance'
import IEconomy from '../../interfaces/IEconomy'
import ISecurity from '../../interfaces/ISecurity'

const Filters: FC<IFiltersProps> = ({ onFilter, filters }) => {
  const [governments, setGovernments] = useState<IGovernment[]>([])
  const [allegiances, setAllegiances] = useState<IAllegiance[]>([])
  const [economies, setEconomoies] = useState<IEconomy[]>([])
  const [securities, setSecurities] = useState<ISecurity[]>([])

  const fetchGovernments = _.memoize(async () => {
    const res = await Government.index()
    setGovernments(res)
  })

  const fetchAllegiances = _.memoize(async () => {
    const res = await Allegiance.index()
    setAllegiances(res)
  })

  const fetchEconomies = _.memoize(async () => {
    const res = await Economy.index()
    setEconomoies(res)
  })

  const fetchSecurities = _.memoize(async () => {
    const res = await Security.index()
    setSecurities(res)
  })

  useEffect(() => {
    fetchGovernments()
    fetchAllegiances()
    fetchEconomies()
    fetchSecurities()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full md:flex-row">
        <div className="flex md:w-1/3 md:mr-2">
          <div className="w-full">
            <div>
              <label
                htmlFor="fleetCarriers"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  onChange={() => onFilter('showPopulated')}
                  type="checkbox"
                  value=""
                  id="fleetCarriers"
                  className="sr-only peer"
                  checked={filters.showPopulated}
                />
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:trangray-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-orange-400" />
                <span className="ml-3 text-sm font-medium text-gray-300">Show Populated Only</span>
              </label>
            </div>
            <div>
              <label
                htmlFor="fleetCarriers"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  onChange={() => onFilter('showPopulated')}
                  type="checkbox"
                  value=""
                  id="fleetCarriers"
                  className="sr-only peer"
                  checked={filters.needsPermit}
                />
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:trangray-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-orange-400" />
                <span className="ml-3 text-sm font-medium text-gray-300">Needs Permit</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/3 md:mr-2 md:ml-2">
          <div className="w-full">
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-300">
                Allegiance
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              >
                <>
                  <option value="">Any</option>
                  {allegiances.map((allegiance: IAllegiance) => {
                    return <option key={allegiance.id}>{allegiance.name}</option>
                  })}
                </>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-300">
                Primary Economy
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              >
                <>
                  <option value="">Any</option>
                  {economies.map((economy: IEconomy) => {
                    return <option key={economy.id}>{economy.name}</option>
                  })}
                </>
              </select>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/3 md:mr-2 md:ml-2">
          <div className="w-full">
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-300">
                Government
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              >
                <>
                  <option value="">Any</option>
                  {governments.map((government: IGovernment) => {
                    return <option key={government.id}>{government.name}</option>
                  })}
                </>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-300">
                Security
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              >
                <>
                  <option value="">Any</option>
                  {securities.map((security: ISecurity) => {
                    return <option key={security.id}>{security.name}</option>
                  })}
                </>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
