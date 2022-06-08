import HTTP from './HTTP'
import ICommodity from '../interfaces/ICommodity'
import IStation from '../interfaces/IStation'
import IStationCommodity from '../interfaces/IStationCommodity'

interface Category {
  category: string
}

class Market extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/commodities'
  }

  public async index(
    column: string,
    direction: string,
    params: object = {}
  ): Promise<ICommodity[]> {
    const p = { ...params, column, direction }
    const response = await this.http.get(this.root, {
      params: p,
    })
    return response.data.commodities
  }

  public async show(name: string): Promise<ICommodity> {
    const response = await this.http.get(`${this.root}/${name}`)
    return response.data
  }

  public async find() {}

  public async categories(): Promise<Category[]> {
    const response = await this.http.get(`${this.root}/categories`)
    return response.data
  }

  public stations = {
    index: async (name: string, params: object = {}): Promise<IStationCommodity[]> => {
      const p = { ...params }
      const response = await this.http.get(`${this.root}/${name}/stations`, {
        params: p,
      })
      return response.data
    },
    min: async (name: string, params: object = {}): Promise<any> => {
      const p = { ...params }
      const response = await this.http.get(`${this.root}/${name}/stations/min`, {
        params: p,
      })
      return response.data
    },
    max: async (name: string, params: object = {}): Promise<any> => {
      const p = { ...params }
      const response = await this.http.get(`${this.root}/${name}/stations/max`, {
        params: p,
      })
      return response.data
    },
  }
}

export default new Market()
