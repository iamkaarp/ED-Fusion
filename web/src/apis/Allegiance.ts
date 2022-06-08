import HTTP from './HTTP'
import IAllegiance from '../interfaces/IAllegiance'

class Allegiance extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/allegiances'
  }
  public async index(): Promise<IAllegiance[]> {
    const reponse = await this.http.get(`${this.root}`)
    return reponse.data
  }

  public async show() {}

  public async find() {}
}

export default new Allegiance()
