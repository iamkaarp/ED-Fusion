import IStation from './IStation'
export default interface IStationCommodity {
  id: number
  station_id: number
  commodity_id: number
  name: string
  buy_price: number
  sell_price: number
  demand: number
  stock: number
  demand_bracket: number
  stock_bracket: number
  updated_at: string
  station: IStation
  meta: any
}
