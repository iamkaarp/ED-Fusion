import React, { FC, useState, useEffect, Fragment } from 'react'
import * as _ from 'lodash'

import Market from '../../apis/Market'

import IMarket from '../../interfaces/IMarket'
import ITable from '../../interfaces/ITable'
import DateFormat from '../../helpers/DateFormat'

import Table from '../Table'

interface IMarketProps extends ITable {
  commodities: IMarket[]
}

const MarketTable: FC<IMarketProps> = ({ commodities, loading, column, direction, onSort }) => {
  const [categories, setCategories] = useState<string[]>([])

  const fetchCategories = _.memoize(async () => {
    const res = await Market.categories()
    const c = res.map((cat: any) => {
      return cat.category
    })
    setCategories(c)
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const th = [
    {
      name: 'Item',
      sortable: true,
      sort: 'categories.name',
      mobile: true,
    },
    {
      name: 'Sell',
      sortable: true,
      sort: 'sell_price',
      mobile: true,
    },
    {
      name: 'Buy',
      sortable: true,
      sort: 'buy_price',
      mobile: true,
    },
    {
      name: 'Demand',
      sortable: true,
      sort: 'demand',
      mobile: true,
    },
    {
      name: 'Stock',
      sortable: true,
      sort: 'stock',
      mobile: true,
    },
    {
      name: 'Updated',
      sortable: true,
      sort: 'updated_at',
      mobile: true,
    },
  ]

  return (
    <>
      {commodities.length > 0 ? (
        <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
          <Table loading={loading} th={th} onSort={onSort} column={column} direction={direction}>
            {categories.map((category: string) => {
              return (
                <Fragment key={category}>
                  {commodities.find(
                    (commodity: IMarket) => commodity.commodity.category === category
                  ) && (
                    <>
                      <tr className="bg-gray-900 border-b border-gray-700 hover:bg-gray-600">
                        <th
                          className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                          colSpan={th.length}
                        >
                          {category}
                        </th>
                      </tr>
                      {commodities.map((commodity: IMarket) => {
                        if (commodity.commodity.category === category) {
                          return (
                            <tr
                              key={commodity.id}
                              className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                              >
                                {commodity.commodity.name}
                              </th>
                              <td className="px-1.5 py-2 md:px-6 md:py-4">
                                {commodity.sell_price.toLocaleString()}
                              </td>
                              <td className="px-1.5 py-2 md:px-6 md:py-4">
                                {commodity.buy_price.toLocaleString()}
                              </td>
                              <td className="px-1.5 py-2 md:px-6 md:py-4">
                                {commodity.demand.toLocaleString()}
                              </td>
                              <td className="px-1.5 py-2 md:px-6 md:py-4">
                                {commodity.stock.toLocaleString()}
                              </td>
                              <td className="px-1.5 py-2 md:px-6 md:py-4">
                                {DateFormat.fromNow(commodity.updated_at)}
                              </td>
                            </tr>
                          )
                        }
                      })}
                    </>
                  )}
                </Fragment>
              )
            })}
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">No Commodities found</div>
      )}
    </>
  )
}

export default MarketTable
