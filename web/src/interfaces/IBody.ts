import IPlanet from './IPlanet'

export default interface IBody {
  id: number
  system_id: number
  planets: IPlanet[]
  updated_at?: string
}
