import IModule from './IModule'

export default interface IOutfitting {
  id: number
  station_id: number
  name: string
  module: IModule
  updated_at: string
}
