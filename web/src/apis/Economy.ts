import HTTP from './HTTP'
import IEconomy from '../interfaces/IEconomy'

class Economy extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/economies'
  }
  public async index(): Promise<IEconomy[]> {
    const reponse = await this.http.get(`${this.root}`)
    return reponse.data
  }

  public async show() {}

  public async find() {}
}

export default new Economy()
