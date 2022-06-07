import HTTP from './HTTP'
import IGovernment from '../interfaces/IGovernment'

class Governments extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/governments'
  }
  public async index(): Promise<IGovernment[]> {
    const reponse = await this.http.get(`${this.root}`)
    return reponse.data
  }
}

export default new Governments()
