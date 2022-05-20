import React, { FC, useEffect, useState, useCallback } from 'react'

import IFiltersProps from './interfaces/IFiltersProps'

const Filters: FC<IFiltersProps> = ({ onFilter, filters }) => {
  return (
    <div className="flex flex-col w-full">
      <div>
        <label htmlFor="fleetCarriers" className="relative inline-flex items-center cursor-pointer">
          <input
            onChange={() => onFilter('showPopulated')}
            type="checkbox"
            value=""
            id="fleetCarriers"
            className="sr-only peer"
            checked={filters.showPopulated}
          />
          <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-orange-400" />
          <span className="ml-3 text-sm font-medium text-gray-300">Show Populated Only</span>
        </label>
      </div>
    </div>
  )
}

export default Filters
