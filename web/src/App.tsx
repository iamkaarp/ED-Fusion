import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from './components/Navbar'

import Home from './views/Home'
import Systems from './views/Systems'
import System from './views/System'
import Stations from './views/Stations'
import Station from './views/Station'
import MapV2 from './views/MapV2'
import MapV3 from './views/MapV3'

import ModalHandler from './components/Modals'
import ShipyardView from './views/Shipyard'
import Frontier from './views/Frontier'
import Settings from './views/Settings'

import EDFusion from './apis/EDFusion'

const App = () => {
  const refSystem = useSelector((state: any) => state.refSystem)
  const fdev = useSelector((state: any) => state.fdev)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      dispatch({ type: 'modal/openModal', payload: { modal: 'search' } })
    }
  })

  const fetchProfile = async () => {
    const res = await EDFusion.fdev.profile()
    if (res.status === 200) {
      dispatch({ type: 'refSystem/set', payload: { system: res.data.lastSystem.name } })
    } else {
      dispatch({ type: 'fdev/setData', payload: { connected: false } })
    }
  }
  const fetchToken = async (code: string) => {
    const res = await EDFusion.fdev.token(code, fdev.verifier)
    if (res.connected) {
      dispatch({ type: 'fdev/setData', payload: { connected: res.connected } })
    } else {
      dispatch({ type: 'fdev/setData', payload: { connected: false } })
    }
  }

  const fetchMe = async () => {
    const res = await EDFusion.user.me()
    dispatch({ type: 'user/setName', payload: { name: res.user.name } })
    dispatch({ type: 'user/setProfile', payload: { profile: { image: res.user.profile.image } } })
  }

  useEffect(() => {
    if (fdev.connected && user.token) {
      const time = Math.floor(new Date().getTime() / 1000)
      if (time - refSystem.checked > 900) {
        fetchProfile()
      }
    }

    if (!fdev.connected && user.token) {
      fetchToken('')
    }
  }, [])

  useEffect(() => {
    if (fdev.connected && user.token) {
      fetchProfile()
    }
  }, [fdev])

  useEffect(() => {
    if (user.token) {
      fetchMe()
    }
  }, [user.token])

  return (
    <>
      <div className="w-full h-full">
        <ModalHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/systems">
            <Route index element={<Systems />} />
            <Route path=":page" element={<Systems />} />
          </Route>
          <Route path="/system/:name">
            <Route index element={<System />} />
            <Route path=":tab" element={<System />} />
          </Route>
          <Route path="/stations">
            <Route index element={<Stations />} />
            <Route path=":page" element={<Stations />} />
          </Route>
          <Route path="/station/:name">
            <Route index element={<Station />} />
            <Route path=":tab" element={<Station />} />
          </Route>
          <Route path="/shipyard">
            <Route index element={<ShipyardView />} />
            <Route path=":name" element={<ShipyardView />} />
          </Route>
          <Route path="/map" element={<MapV2 />} />
          <Route path="/mapv3" element={<MapV3 />} />
          <Route path="/frontier">
            <Route index element={<Frontier />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  )
}

export default App
