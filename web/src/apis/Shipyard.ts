import HTTP from './HTTP'
import IShip from '../interfaces/IShip'
import IStation from '../interfaces/IStation'

class Allegiance extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/ships'
  }
  public async index(): Promise<IShip[]> {
    const reponse = await this.http.get(`${this.root}`)
    return reponse.data
  }

  public async show(name: string): Promise<IShip> {
    const response = await this.http.get(`${this.root}/${name}`)
    return response.data
  }

  public async find() {}

  public async nearest(name: string, params: object = {}): Promise<IStation[]> {
    const p = { ...params, name }
    const response = await this.http.get(`${this.root}/nearest`, {
      params: p,
    })
    return response.data
  }
}

export default new Allegiance()
