import IEconomy from './IEconomy'

export default interface IEconomies {
  id: number
  name: string
  economy: IEconomy[]
  proportion: number
}
