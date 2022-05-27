import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import './index.scss'
import './assets/css/tailwind.css'

import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)

const persistor = persistStore(store)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
