import KeyName from './KeyName'
export default interface IModule extends KeyName {
  category: string
  mount: string
  guidance: string
  ship: string
  class: string
  rating: string
  price: number
}
