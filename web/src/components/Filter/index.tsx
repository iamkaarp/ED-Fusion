import React, { FC, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Icon } from '@mdi/react'
import { mdiFilter } from '@mdi/js'

import IFilterProps from './interfaces/IFilterProps'

import './css/Filter.scss'

const Filter: FC<IFilterProps> = ({ children }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }

  const duration = 300

  return (
    <CSSTransition in={showFilter} timeout={300} classNames="filter-wrapper">
      <div className="filters-container">
        <div className="filters-button">
          <button
            data-tooltip-target="tooltip-right"
            onClick={handleFilter}
            type="button"
            className="text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-orange-400 font-medium rounded-r-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none flex items-center"
          >
            <Icon path={mdiFilter} size={0.8} />
          </button>
          <div
            id="tooltip-right"
            role="tooltip"
            className="absolute invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 z-9 tooltip dark:bg-gray-700"
          >
            Tooltip on right
            <div className="tooltip-arrow" data-popper-arrow />
          </div>
        </div>
        <div className="h-full px-4 py-20 overflow-auto">{children}</div>
      </div>
    </CSSTransition>
  )
}

export default Filter
