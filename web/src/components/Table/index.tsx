import React, { FC } from 'react'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiMenuUp } from '@mdi/js'

import Loader from '../Loader/index'

interface TableProps {
  th: any[]
  column: string
  direction: string
  loading: boolean
  fixed?: boolean
  onSort: (column: string, direction: string) => void
  children: JSX.Element | JSX.Element[]
}

const Table: FC<TableProps> = ({
  th,
  loading,
  onSort,
  column,
  direction,
  children,
  fixed = false,
}) => {
  return (
    <>
      {loading && (
        <div
          className="absolute flex items-center justify-center w-full h-full min-h-96"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <Loader />
        </div>
      )}
      <table className={`w-full text-sm text-left text-gray-400 ${fixed ? 'table-fixed' : ''}`}>
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            {th.map((item, index) => {
              if (item.sortable) {
                return (
                  <th
                    key={index}
                    scope="col"
                    className={`sticky top-0 px-1.5 py-2 md:px-6 md:py-3 cursor-pointer hover:text-orange-400 ${
                      item.mobile ? '' : 'hidden md:table-cell'
                    } `}
                    onClick={() => {
                      onSort(item.sort!, direction === 'asc' ? 'desc' : 'asc')
                    }}
                  >
                    <div className="flex items-center">
                      {item.name}
                      {column === item.sort && (
                        <Icon path={direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={1} />
                      )}
                    </div>
                  </th>
                )
              } else {
                return (
                  <th
                    key={index}
                    scope="col"
                    className={`px-1.5 py-2 md:px-6 md:py-3 cursor-pointer ${
                      item.mobile ? '' : 'hidden md:table-cell'
                    } `}
                  >
                    <div className="flex items-center">{item.name}</div>
                  </th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  )
}

export default Table
