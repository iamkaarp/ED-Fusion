import axios, { Axios } from 'axios'

import ISystem from '../interfaces/ISystem'
import ISystems from './interfaces/ISystems'

interface Systems {
  data: ISystem[]
  meta: {
    current_page: number
    first_page: number
    last_page: number
    per_page: number
    total: number
  }
}
class EDFusion {
  http: Axios = axios.create({
    //baseURL: 'https://api.ed-fusion.com',
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333'
        : 'https://api.ed-fusion.com',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  systems = {
    get: async (system: string): Promise<ISystem> => {
      const response = await this.http.get(`/systems/${system}`)
      return response.data.system
    },
    index: async (page: number, sortBy: string, order: string): Promise<Systems> => {
      const response = await this.http.get(`/systems/${page}/${sortBy}/${order}`)
      return response.data.systems
    },
    search: async (query: string): Promise<ISystem[]> => {
      const response = await this.http.get('/systems/search/', {
        params: {
          q: query,
        },
      })
      return response.data.systems
    },
    stations: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/stations/${sortBy}/${order}`)
      return response.data
    },
    factions: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/factions/${sortBy}/${order}`)
      return response.data
    },
    positions: async (distance: number = 150): Promise<any> => {
      const response = await this.http.get(`/systems/positions/${distance}`)
      return response.data
    },
  }
}

export default new EDFusion()
