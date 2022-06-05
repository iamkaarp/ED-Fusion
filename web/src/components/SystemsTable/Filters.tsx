import React, { FC, useEffect, useState, useCallback } from 'react'

import IFiltersProps from './interfaces/IFiltersProps'

const Filters: FC<IFiltersProps> = ({ onFilter, filters }) => {
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
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-neutral-700 peer-checked:after:tranneutral-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-neutral-600 peer-checked:bg-orange-400" />
                <span className="ml-3 text-sm font-medium text-neutral-300">
                  Show Populated Only
                </span>
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
                  checked={filters.showPopulated}
                />
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-neutral-700 peer-checked:after:tranneutral-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-neutral-600 peer-checked:bg-orange-400" />
                <span className="ml-3 text-sm font-medium text-neutral-300">Needs Permit</span>
              </label>
            </div>
          </div>
          <div className="w-full">
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-neutral-300">
                Allegiance
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-neutral-300">
                Government
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/3 md:mr-2 md:ml-2">
          <div className="w-full">
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-neutral-300">
                Government
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex md:w-1/3 md:mr-2 md:ml-2">
          <div className="w-full">
            <div>
              <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-neutral-300">
                Government
              </label>
              <select
                id="countries"
                className="text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
