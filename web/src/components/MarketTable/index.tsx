import React, { FC, Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as _ from 'lodash'

import Market from '../../apis/Market'
import DateFormat from '../../helpers/DateFormat'
import ICommodity from '../../interfaces/ICommodity'

import Table from '../Table'
import Loader from '../Loader'

const MarketTable: FC = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [market, setMarket] = useState<ICommodity[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const dispatch = useDispatch()

  const marketColumn = useSelector((state: any) => state.sort.market.column)
  const marketDirection = useSelector((state: any) => state.sort.market.direction)

  const fetchCategories = _.memoize(async () => {
    const res = await Market.categories()
    const c = res.map((cat: { category: string }) => {
      return cat.category
    })
    setCategories(c)
  })

  const fetchMarket = _.memoize(async () => {
    setLoading(true)
    const res = await Market.index(marketColumn, marketDirection)
    console.log(res)
    setMarket(res)
    setLoading(false)
  })

  useEffect(() => {
    fetchMarket()
  }, [marketColumn, marketDirection])

  useEffect(() => {
    setFirstLoad(true)
    if (market.length > 0) {
      setFirstLoad(false)
    }
  }, [market])

  useEffect(() => {
    fetchCategories()
    fetchMarket()
  }, [])

  const onSort = (column: string, direction: string) => {
    dispatch({ type: 'sort/setColumn', payload: { type: 'market', column } })
    dispatch({ type: 'sort/setDirection', payload: { type: 'market', direction } })
  }

  const th = [
    {
      name: 'Item',
      sortable: true,
      sort: 'name',
      mobile: true,
    },
    {
      name: 'Avg Sell',
      sortable: true,
      sort: 'avg_sell',
      mobile: true,
    },
    {
      name: 'Avg Buy',
      sortable: true,
      sort: 'avg_buy',
      mobile: true,
    },
    {
      name: 'Min Sell',
      sortable: true,
      sort: 'min_sell',
      mobile: true,
    },
    {
      name: 'Max Sell',
      sortable: true,
      sort: 'max_sell',
      mobile: true,
    },
    {
      name: 'Min Buy',
      sortable: true,
      sort: 'min_buy',
      mobile: true,
    },
    {
      name: 'Max Buy',
      sortable: true,
      sort: 'max_buy',
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
      {firstLoad ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-8 text-3xl text-gray-400">Market</h1>
          {market.length > 0 ? (
            <div className="relative mt-4 overflow-x-auto shadow-md min-h-128 sm:rounded-lg">
              <Table
                loading={loading}
                th={th}
                onSort={onSort}
                column={marketColumn}
                direction={marketDirection}
              >
                {categories.map((category: string) => {
                  return (
                    <Fragment key={category}>
                      {market.find(
                        (commodity: ICommodity) =>
                          commodity.category === category && commodity.category !== 'NonMarketable'
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
                          {market.map((commodity: ICommodity) => {
                            if (
                              commodity.category === category &&
                              commodity.avg_sell &&
                              commodity.category !== 'NonMarketable'
                            ) {
                              return (
                                <tr
                                  key={commodity.id}
                                  className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                                >
                                  <th
                                    scope="row"
                                    className="px-1.5 py-2 md:px-6 md:py-4 font-medium text-white whitespace-nowrap"
                                  >
                                    <Link
                                      className="hover:text-orange-400"
                                      to={`/market/${commodity.name}`}
                                    >
                                      {commodity.name}
                                    </Link>
                                  </th>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.avg_sell.toLocaleString()}
                                  </td>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.avg_buy.toLocaleString()}
                                  </td>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.min_sell.toLocaleString()}
                                  </td>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.max_sell.toLocaleString()}
                                  </td>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.min_buy.toLocaleString()}
                                  </td>
                                  <td className="px-1.5 py-2 md:px-6 md:py-4">
                                    {commodity.max_buy.toLocaleString()}
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
      )}
    </>
  )
}

export default MarketTable
