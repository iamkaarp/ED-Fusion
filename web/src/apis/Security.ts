import HTTP from './HTTP'
import ISecurity from '../interfaces/ISecurity'

class Security extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/securities'
  }
  public async index(): Promise<ISecurity[]> {
    const reponse = await this.http.get(`${this.root}`)
    return reponse.data
  }

  public async show() {}

  public async find() {}
}

export default new Security()
