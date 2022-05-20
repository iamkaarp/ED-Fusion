import React, { useState } from 'react'
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
import Footer from './components/Footer'
import ShipyardView from './views/Shipyard'

const App = () => {
  const dispatch = useDispatch()

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      dispatch({ type: 'modal/openModal', payload: { modal: 'search' } })
    }
  })

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
        </Routes>
      </div>
    </>
  )
}

export default App
