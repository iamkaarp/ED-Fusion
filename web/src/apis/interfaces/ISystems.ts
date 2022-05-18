import ISystem from './ISystem'
export default interface ISystems {
  data: ISystem[]
  meta: {
    current_page: number
    first_page: number
    last_page: number
    per_page: number
    total: number
  }
}
