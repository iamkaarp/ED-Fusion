export default interface IService {
  id: number
  name: string
  station_id: number
  updated_at: string
  service: {
    id: number
    name: string
    key: string
    shown: boolean
  }
}
