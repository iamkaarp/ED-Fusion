import React, { FC, useEffect, useState } from 'react'
import * as _ from 'lodash'

import Body from '../../apis/Body'

import Star from './Star'
import Planet from './Planet'

import Loader from '../Loader'

import IBodyData from './interfaces/IBodyData'
import IStar from '../../interfaces/IStar'
import IPlanet from '../../interfaces/IPlanet'

const BodyData: FC<IBodyData> = ({ name }) => {
  const [star, setStar] = useState<IStar>({} as IStar)
  const [planet, setPlanet] = useState<IPlanet>({} as IPlanet)
  const [type, setType] = useState<string>('star')
  const [loading, setLoading] = useState<boolean>(true)
  const fetchBody = _.memoize(async () => {
    setLoading(true)
    const res = await Body.show(name)
    if (res.hasOwnProperty('star')) {
      setType('star')
      setStar(res.star)
    }

    if (res.hasOwnProperty('planet')) {
      setType('planet')
      setPlanet(res.planet)
    }
    setLoading(false)
  })

  useEffect(() => {
    fetchBody()
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-48">
          <div>
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {type === 'star' && <Star data={star} />}
          {type === 'planet' && <Planet data={planet} />}
        </>
      )}
    </>
  )
}

export default BodyData
