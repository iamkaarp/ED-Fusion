import axios, { Axios } from 'axios'
import store from '../store'

class HTTP {
  http: Axios = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333'
        : 'https://api.ed-fusion.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  constructor() {
    store.subscribe(this.listener)
  }

  private listener = () => {
    let token = store.getState().user.token
    if (token) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}

export default HTTP
