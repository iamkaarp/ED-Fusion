import HTTP from './HTTP'
import IService from '../interfaces/IService'

class Services extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/services'
  }
  public async index(): Promise<IService[]> {
    const response = await this.http.get(this.root)
    return response.data
  }

  public async show() {}

  public async find() {}
}

export default new Services()
