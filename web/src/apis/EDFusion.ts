import axios, { Axios } from 'axios'

import ISystem from '../interfaces/ISystem'
import ISystems from './interfaces/ISystems'

import IStation from '../interfaces/IStation'

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

interface Stations {
  data: IStation[]
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
    orbital: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/stations/orbital/${sortBy}/${order}`)
      return response.data
    },
    planetary: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/stations/planetary/${sortBy}/${order}`)
      return response.data
    },
    fleetCarriers: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(
        `/system/${id}/stations/fleetCarriers/${sortBy}/${order}`
      )
      return response.data
    },
    bodies: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/bodies/${sortBy}/${order}`)
      return response.data
    },
    stars: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/system/${id}/stars/${sortBy}/${order}`)
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

  stations = {
    get: async (system: string): Promise<IStation> => {
      const response = await this.http.get(`/stations/${system}`)
      return response.data.station
    },
    index: async (
      page: number,
      sortBy: string,
      order: string,
      params: object = {}
    ): Promise<Stations> => {
      const response = await this.http.get(`/stations/${page}/${sortBy}/${order}`, {
        params,
      })
      return response.data.stations
    },
    search: async (query: string): Promise<IStation[]> => {
      const response = await this.http.get('/stations/search', {
        params: {
          q: query,
        },
      })
      return response.data.stations
    },
    indexTypes: async (): Promise<any> => {
      const response = await this.http.get('/stations/types')
      return response
    },
    indexShips: async (id: number): Promise<any> => {
      const response = await this.http.get(`/station/${id}/ships`)
      return response.data
    },
    indexModules: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/station/${id}/modules/${sortBy}/${order}`)
      return response.data
    },
    market: async (id: number, sortBy: string, order: string): Promise<any> => {
      const response = await this.http.get(`/station/${id}/commodities/${sortBy}/${order}`)
      return response.data
    },
    show: async (name: string): Promise<IStation> => {
      const response = await this.http.get(`/station/${name}`)
      return response.data.station
    },
  }

  services = {
    index: async (): Promise<any> => {
      const response = await this.http.get('/services')
      return response
    },
  }

  commodities = {
    index: async (): Promise<any> => {
      const response = await this.http.get('/commodities')
      return response
    },
    categories: async (): Promise<any> => {
      const response = await this.http.get('/commodity/categories')
      return response
    },
  }

  modules = {
    index: async (): Promise<any> => {
      const response = await this.http.get('/modules')
      return response
    },
  }

  ships = {
    index: async (): Promise<any> => {
      const response = await this.http.get('/ships')
      return response
    },
    get: async (name: string): Promise<any> => {
      const response = await this.http.get(`/ships/${name}`)
      return response
    },
  }

  discount = {
    index: async (): Promise<any> => {},
    find: async (name: string): Promise<any> => {
      const response = await this.http.get(`/discounts/${name}`)
      return response
    },
  }
}

export default new EDFusion()
