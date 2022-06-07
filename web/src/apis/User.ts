import HTTP from './HTTP'

class User extends HTTP {
  private root: string
  constructor() {
    super()
    this.root = '/users'
  }

  public async signIn(email: string, password: string) {
    const response = await this.http.post(`${this.root}/login`, {
      email,
      password,
    })
    return response
  }

  public async signUp(
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
    image: string
  ) {
    const response = await this.http.post(`${this.root}/signup`, {
      username,
      email,
      password,
      passwordConfirm,
      image,
    })
    return response.data
  }

  public async signOut() {
    const response = await this.http.post(`${this.root}/logout`)
    return response.data
  }

  public async me() {
    const response = await this.http.get(`${this.root}/me`)
    return response.data
  }

  public async update(params: object) {
    const response = await this.http.put(`${this.root}/update`, params)
    return response.data
  }
}

export default new User()
