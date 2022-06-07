import IGovernment from './IGovernment'
import IEconomies from './IEconomies'
import IFaction from './IFaction'
import ISystem from './ISystem'
import IAllegiance from './IAllegiance'
import IEconomy from './IEconomy'
import IStationService from './IStationService'

export default interface IStation {
  id: number
  distance_from_star: number
  type: string
  name: string
  government: IGovernment
  economy: IEconomy
  economies: IEconomies[]
  allegiance: IAllegiance
  faction: {
    id: number
    station_id: number
    faction_id: number
    faction: IFaction
  }
  system: ISystem
  services: IStationService[]
  max_landing_pad_size: string
  updated_at: string
}
