import IEconomy from './IEconomy'
import IAllegiance from './IAllegiance'
import IStation from './IStation'
import IFactions from './IFactions'
import ISecurity from './ISecurity'
import IGovernment from './IGovernment'

export default interface ISystem {
  id: number
  name: string
  needs_permit: boolean
  address: number
  position: string
  population: number
  primaryEconomy: IEconomy
  allegiance: IAllegiance
  stations: IStation[]
  security: ISecurity
  factions: IFactions[]
  government: IGovernment
  distance: number
  updated_at: string
}
