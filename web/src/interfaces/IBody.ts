import IPlanet from './IPlanet'
import IStar from './IStar'
import ISystem from './ISystem'
export default interface IBody {
  id: number
  system_id: number
  planets: IPlanet[]
  stars: IStar[]
  system: ISystem
  updated_at?: string
}
