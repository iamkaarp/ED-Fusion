import ICommodity from './ICommodity'

export default interface IMarket {
  id: number
  station_id: number
  commodity_id: number
  name: string
  buy_price: number
  sell_price: number
  demand: number
  stock: number
  updated_at: string
  commodity: ICommodity
}
