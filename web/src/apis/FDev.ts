import HTTP from './HTTP'

class FDev extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/fdev'
  }

  public async url() {
    const response = await this.http.get(`${this.root}/url`)
    return response.data
  }

  public async profile(): Promise<any> {
    const response = await this.http.get(`${this.root}/profile`)
    return response.data
  }

  public async token(code: string, verifier: string): Promise<any> {
    const response = await this.http.post(`${this.root}/token`, {
      code,
      verifier,
    })
    return response.data
  }
}

export default new FDev()
