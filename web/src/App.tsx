import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './views/Home'
import Systems from './views/Systems'
import System from './views/System'
import MapV2 from './views/MapV2'
import MapV3 from './views/MapV3'

import ModalHandler from './components/Modals'

const App = () => {
  return (
    <>
      <ModalHandler />
      <div className="w-full h-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/systems">
            <Route index element={<Systems />} />
            <Route path=":page" element={<Systems />} />
          </Route>
          <Route path="/system/:name" element={<System />} />
          <Route path="/map" element={<MapV2 />} />
          <Route path="/mapv3" element={<MapV3 />} />
        </Routes>
      </div>
    </>
  )
}

export default App
