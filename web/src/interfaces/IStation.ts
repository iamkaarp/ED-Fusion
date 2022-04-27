import IGovernment from './IGovernment'
import IEconomies from './IEconomies'
import IFaction from './IFaction'

export default interface IStation {
  id: number
  distance_from_star: number
  type: string
  name: string
  government?: IGovernment
  economies: IEconomies[]
  faction: {
    id: number
    station_id: number
    faction_id: number
    faction: IFaction
  }
  max_landing_pad_size?: string
  updated_at?: string
}
