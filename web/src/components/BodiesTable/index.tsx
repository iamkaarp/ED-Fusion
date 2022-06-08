import React, { FC, useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'lodash'

import Body from '../../apis/Body'

import DateFormat from '../../helpers/DateFormat'

import Loader from '../Loader'
import Table from '../Table'
import Pagination from '../Pagination'

import IBodiesTable from './interfaces/IBodiesTable'
import IBody from '../../interfaces/IBody'
import IStar from '../../interfaces/IStar'
import IPlanet from '../../interfaces/IPlanet'

const BodiesTable: FC<IBodiesTable> = ({ page }) => {
  const [bodies, setBodies] = useState<IBody[]>([])
  const [meta, setMeta] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const column = 'name'
  const direction = 'asc'

  const sort = () => {}

  const fetchbodies = _.memoize(async () => {
    setLoading(true)
    const res = await Body.index(page, column, direction)
    console.log(res)
    setBodies(res.data)
    setMeta(res.meta)
    setLoading(false)
  })

  useEffect(() => {
    setFirstLoad(true)
    fetchbodies()
    setFirstLoad(false)
  }, [])

  const th = [
    {
      name: 'Name',
      sort: 'name',
      sortable: true,
      mobile: true,
    },
    {
      name: 'System',
      sort: 'system',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Type',
      sort: 'type',
      sortable: true,
      mobile: false,
    },
    {
      name: 'Distance',
      sort: 'distance',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Distance Sol',
      sort: 'system.distance',
      sortable: true,
      mobile: true,
    },
    {
      name: 'Updated',
      sort: 'updated_at',
      sortable: true,
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
          <h1 className="mb-8 text-3xl text-gray-400">Bodies</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[16rem]">
            <Table th={th} loading={loading} onSort={sort} column={column} direction={direction}>
              {bodies.map((body: IBody) => {
                return (
                  <Fragment key={body.id}>
                    {body.stars.map((star: IStar) => {
                      return (
                        <tr
                          key={star.id}
                          className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="font-medium px-1.5 py-2 text-white md:px-6 md:py-4 whitespace-nowrap"
                          >
                            <Link to={`/body/${star.name}`} className="hover:text-orange-400">
                              {star.name}
                            </Link>
                          </th>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            <Link
                              to={`/system/${body.system.name}`}
                              className="hover:text-orange-400"
                            >
                              {body.system.name}
                            </Link>
                          </td>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            {star.type}
                          </td>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            {star.distance.toLocaleString()} Ls
                          </td>
                          <td className="px-1.5 py-2 md:px-6 md:py-4">{body.system.distance} Ly</td>
                          <td className="px-1.5 py-2 md:px-6 md:py-4">
                            {DateFormat.fromNow(body.updated_at)}
                          </td>
                        </tr>
                      )
                    })}
                    {body.planets.map((planet: IPlanet) => {
                      return (
                        <tr
                          key={planet.id}
                          className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="font-medium px-1.5 py-2 text-white md:px-6 md:py-4 whitespace-nowrap"
                          >
                            <Link to={`/body/${planet.name}`} className="hover:text-orange-400">
                              {planet.name}
                            </Link>
                          </th>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            <Link
                              to={`/system/${body.system.name}`}
                              className="hover:text-orange-400"
                            >
                              {body.system.name}
                            </Link>
                          </td>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            {planet.class}
                          </td>
                          <td className="hidden px-1.5 py-2 md:px-6 md:py-4 md:table-cell">
                            {planet.distance.toLocaleString()} Ls
                          </td>
                          <td className="px-1.5 py-2 md:px-6 md:py-4">{body.system.distance} Ly</td>
                          <td className="px-1.5 py-2 md:px-6 md:py-4">
                            {DateFormat.fromNow(body.updated_at)}
                          </td>
                        </tr>
                      )
                    })}
                  </Fragment>
                )
              })}
            </Table>
          </div>
          <div className="w-full mt-4">
            <Pagination view="systems" currentPage={page} lastPage={meta.last_page} />
          </div>
        </>
      )}
    </>
  )
}

export default BodiesTable
