import IShip from './IShip'

export default interface IShipyard {
  id: number
  station_id: number
  name: string
  updated_at: string
  ship: IShip
}
