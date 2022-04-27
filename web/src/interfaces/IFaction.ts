import IGovernment from './IGovernment'
import IAllegiance from './IAllegiance'

export default interface IFaction {
  id: number
  government_id: number
  allegiance_id: number
  name: string
  state: string
  influence: number
  active_states: string
  pending_states: string
  recovering_states: string
  happiness: string
  updated_at: string
  government: IGovernment
  allegiance: IAllegiance
}
