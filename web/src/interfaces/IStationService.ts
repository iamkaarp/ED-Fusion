import IService from './IStationService'
export default interface IStationService {
  id: number
  name: string
  station_id: number
  updated_at: string
  service: IService
}
