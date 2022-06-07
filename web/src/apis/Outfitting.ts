import IOutfitting from '../interfaces/IOutfitting'
import HTTP from './HTTP'

class Outfitting extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/modules'
  }

  public async index(): Promise<IOutfitting[]> {
    const response = await this.http.get(this.root, {})
    return response.data
  }
}

export default new Outfitting()
