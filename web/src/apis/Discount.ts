import HTTP from './HTTP'
import IDiscount from '../interfaces/IDiscount'

class Discount extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/discounts'
  }

  public async index() {}

  public async show() {}

  public async find(name: string): Promise<IDiscount[]> {
    const response = await this.http.get(`${this.root}/${name}`)
    return response.data
  }
}

export default new Discount()
