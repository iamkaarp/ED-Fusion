import HTTP from './HTTP'
import ISystem from '../interfaces/ISystem'
import IStation from '../interfaces/IStation'
import IPlanet from '../interfaces/IPlanet'
import IStar from '../interfaces/IStar'
import ISystemFaction from '../interfaces/ISystemFaction'

interface Meta {
  current_page: number
  first_page: number
  last_page: number
  per_page: number
  total: number
  fist_page_url: string
  last_page_url: string
  next_page_url: string
}

interface Systems {
  data: ISystem[]
  meta: Meta
}

class System extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/systems'
  }

  public async index(
    page: number,
    column: string,
    direction: string,
    params: object = {}
  ): Promise<Systems> {
    const p = { ...params, page, column, direction }
    const response = await this.http.get(this.root, {
      params: p,
    })
    return response.data.systems
  }

  public async show(system: string): Promise<ISystem> {
    const response = await this.http.get(`${this.root}/${system}`)
    return response.data.system
  }

  public async find(query: string): Promise<ISystem[]> {
    const response = await this.http.get(`${this.root}/find`, {
      params: {
        q: query,
      },
    })
    return response.data.systems
  }

  public async positions(distance: number = 150, params: object = {}): Promise<any> {
    const p = { ...params, distance }
    const response = await this.http.get('/systems/positions', {
      params: p,
    })
    return response.data
  }

  public stations = {
    index: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IStation[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/stations`, {
        params: p,
      })
      return response.data
    },
    orbital: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IStation[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/stations/orbital`, {
        params: p,
      })
      return response.data
    },
    planetary: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IStation[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/stations/planetary`, {
        params: p,
      })
      return response.data
    },
    fleetCarriers: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IStation[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/stations/fleetcarrier`, {
        params: p,
      })
      return response.data
    },
  }

  public factions = {
    index: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<ISystemFaction[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/factions`, {
        params: p,
      })
      return response.data
    },
  }
  public bodies = {
    planets: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<{ id: number; system_id: number; updated_at: string; planets: IPlanet[] }> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/bodies/planets`, {
        params: p,
      })
      return response.data
    },
    stars: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<{ id: number; system_id: number; updated_at: string; stars: IStar[] }> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/bodies/stars`, {
        params: p,
      })
      return response.data
    },
  }
}

export default new System()
