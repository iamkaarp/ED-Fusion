import IFaction from './IFaction'

export default interface IFactions {
  id: number
  faction_id: number
  system_id?: number
  faction: IFaction
}
