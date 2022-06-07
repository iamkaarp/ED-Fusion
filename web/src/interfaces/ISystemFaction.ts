import IFaction from './IFaction'

export default interface ISystemFaction {
  id: number
  faction_id: number
  system_id?: number
  faction: IFaction
}
