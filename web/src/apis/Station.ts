import HTTP from './HTTP'
import IStation from '../interfaces/IStation'
import IShipyard from '../interfaces/IShipyard'
import IOutfitting from '../interfaces/IOutfitting'
import IMarket from '../interfaces/IMarket'

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

interface Stations {
  data: IStation[]
  meta: Meta
}

interface Types {
  type: string
}

class Station extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/stations'
  }

  public async index(
    page: number,
    column: string,
    direction: string,
    params: object = {}
  ): Promise<Stations> {
    const p = { ...params, page, column, direction }
    const response = await this.http.get(this.root, {
      params: p,
    })
    return response.data.stations
  }

  public async show(station: string): Promise<IStation> {
    const response = await this.http.get(`${this.root}/${station}`)
    return response.data.station
  }

  public async find(query: string): Promise<IStation[]> {
    const response = await this.http.get(`${this.root}/find`, {
      params: {
        q: query,
      },
    })
    return response.data.stations
  }

  public async types(): Promise<Types[]> {
    return await this.http.get(`${this.root}/types`)
  }

  public ships = {
    index: async (id: number): Promise<IShipyard[]> => {
      const response = await this.http.get(`${this.root}/${id}/ships`)
      return response.data
    },
  }

  public outfitting = {
    index: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IOutfitting[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/outfitting`, {
        params: p,
      })
      return response.data
    },
  }

  public commodities = {
    index: async (
      id: number,
      column: string,
      direction: string,
      params: object = {}
    ): Promise<IMarket[]> => {
      const p = { ...params, column, direction }
      const response = await this.http.get(`${this.root}/${id}/commodities`, {
        params: p,
      })
      return response.data
    },
  }
}

export default new Station()
