import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './assets/css/tailwind.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
