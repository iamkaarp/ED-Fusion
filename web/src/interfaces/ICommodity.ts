import IStationCommodity from './IStationCommodity'

export default interface ICommodity {
  id: number
  name: string
  category: string
  key: string
  min_sell: number
  max_sell: number
  min_buy: number
  max_buy: number
  avg_sell: number
  avg_buy: number
  stationCommodities: IStationCommodity[]
  updated_at: string
}
