import React, { FC, useState, useEffect } from 'react'

import IOutfitting from '../../interfaces/IOutfitting'
import IDiscount from '../../interfaces/IDiscount'
import ITable from '../../interfaces/ITable'

import Table from '../Table'
import Input from '../Forms/Input'

interface OutfittingProps extends ITable {
  modules: IOutfitting[]
  discount?: string
}

const Outfitting: FC<OutfittingProps> = ({ modules, loading, column, direction, onSort }) => {
  const [filter, setFilter] = useState<string>('')
  const [filteredModules, setFilteredModules] = useState<IOutfitting[]>(modules)

  const th = [
    {
      name: 'Name',
      sortable: true,
      sort: 'name',
      mobile: true,
    },
    {
      name: 'Category',
      sortable: true,
      sort: 'category',
      mobile: false,
    },
    {
      name: 'Mount',
      sortable: true,
      sort: 'mount',
      mobile: false,
    },
    {
      name: 'Guidance',
      sortable: true,
      sort: 'guidance',
      mobile: false,
    },
    {
      name: 'Ship',
      sortable: true,
      sort: 'ship',
      mobile: false,
    },
    {
      name: 'Class',
      sortable: true,
      sort: 'class',
      mobile: false,
    },
    {
      name: 'Rating',
      sortable: true,
      sort: 'rating',
      mobile: false,
    },
    {
      name: 'Price',
      sortable: true,
      sort: 'price',
      mobile: true,
    },
  ]

  useEffect(() => {
    setFilteredModules(modules)
  }, [modules])

  const onChange = (e: React.ChangeEvent<any>) => {
    setFilter(e.target.value)
    if (e.target.value !== '') {
      const mods = modules.filter((module) => {
        return (
          `${module.module.class}${module.module.rating} ${module.module.name}`
            .toLocaleLowerCase()
            .indexOf(e.target.value.toLowerCase()) > -1
        )
      })

      setFilteredModules(mods)
    } else {
      setFilteredModules(modules)
    }
  }

  return (
    <>
      {modules.length > 0 ? (
        <>
          <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
            <Input
              type="text"
              title="Filter"
              placeholder="8A Fuel Scoop"
              classes=""
              value={filter}
              onChange={onChange}
            />
          </div>
          {filteredModules.length > 0 ? (
            <>
              <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
                <Table
                  th={th}
                  loading={loading}
                  onSort={onSort}
                  column={column}
                  direction={direction}
                >
                  {filteredModules.map((module: IOutfitting) => {
                    return (
                      <tr
                        key={module.id}
                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                        >
                          {module.module.class}
                          {module.module.rating} {module.module.name}
                        </th>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.category}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.mount}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.guidance}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.ship}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.class}
                        </td>
                        <td className="px-1.5 py-2 hidden md:table-cell md:px-6 md:py-4">
                          {module.module.rating}
                        </td>
                        <td className="px-1.5 py-2 md:px-6 md:py-4">
                          {module.module.price.toLocaleString()} Cr
                        </td>
                      </tr>
                    )
                  })}
                </Table>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">No Outfitting found</div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full">No Outfitting found</div>
      )}
    </>
  )
}

export default Outfitting
