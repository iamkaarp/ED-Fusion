import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FDev from '../apis/FDev'

const Frontier: FC = () => {
  const [params] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const verifier = useSelector((state: any) => state.fdev.verifier)
  const [url, setUrl] = useState<string>('')

  const code = params.get('code')

  const fetchURL = async () => {
    const res = await FDev.url()
    setUrl(res.url)
    dispatch({ type: 'fdev/setVerifier', payload: res.verifier })
  }

  const fetchToken = async (code: string) => {
    const res = await FDev.token(code, verifier)
    if (res.connected) {
      dispatch({ type: 'fdev/setData', payload: { connected: res.connected } })
    } else {
      dispatch({ type: 'fdev/setData', payload: { connected: false } })
    }
  }

  useEffect(() => {
    fetchURL()
  }, [])

  useEffect(() => {
    if (code) {
      fetchToken(code)
      navigate('/')
    }
  }, [code])

  return (
    <>
      <Helmet>
        <title>ED-Fusion - Frontier Connect</title>
      </Helmet>
      <div className="container h-full pt-24 pb-12 mx-auto">
        <div className="flex items-center justify-center w-full h-32 mb-4">
          <a href={url} className="block p-4 font-bold text-white bg-orange-400 shadow-lg frontier">
            Connect to frontier
          </a>
        </div>
      </div>
    </>
  )
}

export default Frontier
