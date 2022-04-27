export default interface IFaction {
  id: number
  happiness: string
  name: string
  influence: number
  state: string
  pending_states: string
  recovering_states: string
  active_states: string
}
