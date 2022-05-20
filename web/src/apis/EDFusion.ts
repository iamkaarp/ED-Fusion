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
    show: async (system: string): Promise<ISystem> => {
      const response = await this.http.get(`/systems/${system}`)
      return response.data.system
    },
    index: async (
      page: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<Systems> => {
      const p = { ...params, page, column, direction }
      const response = await this.http.get('/systems', {
        params: p,
      })
      return response.data.systems
    },
    search: async (query: string): Promise<ISystem[]> => {
      const response = await this.http.get('/systems/find', {
        params: {
          q: query,
        },
      })
      return response.data.systems
    },
    stations: {
      index: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/stations`, {
          params: p,
        })
        return response.data
      },
      orbital: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/stations/orbital`, {
          params: p,
        })
        return response.data
      },
      planetary: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/stations/planetary`, {
          params: p,
        })
        return response.data
      },
      fleetCarriers: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/stations/fleetcarrier`, {
          params: p,
        })
        return response.data
      },
    },
    factions: {
      index: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/factions`, {
          params: p,
        })
        return response.data
      },
    },
    bodies: {
      planets: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/bodies/planets`, {
          params: p,
        })
        return response.data
      },
      stars: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/systems/${id}/bodies/stars`, {
          params: p,
        })
        return response.data
      },
    },

    positions: async (distance: number = 150, params: object = {}): Promise<any> => {
      const p = { ...params, distance }
      const response = await this.http.get('/systems/positions', {
        params: p,
      })
      return response.data
    },
  }

  stations = {
    index: async (
      page: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<Stations> => {
      const p = { ...params, page, column, direction }
      const response = await this.http.get('/stations', {
        params: p,
      })
      return response.data.stations
    },
    search: async (query: string): Promise<IStation[]> => {
      const response = await this.http.get('/stations/find', {
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
    show: async (name: string): Promise<IStation> => {
      const response = await this.http.get(`/stations/${name}`)
      return response.data.station
    },
    ships: {
      index: async (id: number): Promise<any> => {
        const response = await this.http.get(`/stations/${id}/ships`)
        return response.data
      },
    },
    outfitting: {
      index: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/stations/${id}/outfitting`, {
          params: p,
        })
        return response.data
      },
    },
    commodities: {
      index: async (
        id: number,
        column: string,
        direction: string,
        params: object = {}
      ): Promise<any> => {
        const p = { ...params, column, direction }
        const response = await this.http.get(`/stations/${id}/commodities`, {
          params: p,
        })
        return response.data
      },
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
      const response = await this.http.get('/commodities/categories')
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
