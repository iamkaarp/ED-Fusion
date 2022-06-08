import HTTP from './HTTP'
import IBody from '../interfaces/IBody'
import IStar from '../interfaces/IStar'
import IPlanet from '../interfaces/IPlanet'

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

interface Bodies {
  data: IBody[]
  meta: Meta
}

class Body extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/bodies'
  }
  public async index(
    page: number,
    column: string,
    direction: string,
    params: object = {}
  ): Promise<Bodies> {
    const p = { ...params, page, column, direction }
    const response = await this.http.get(this.root, {
      params: p,
    })
    return response.data.bodies
  }

  public async show(name: string): Promise<{ star: IStar; planet: IPlanet }> {
    const response = await this.http.get(`${this.root}/${name}`)
    return response.data
  }

  public async find() {}
}

export default new Body()
