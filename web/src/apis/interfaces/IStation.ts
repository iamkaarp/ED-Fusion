import IEconomies from './IEconomies'

export default interface IStation {
  id: number
  distance_from_star: number
  type: string
  name: string
  economies: IEconomies[]
}
