export interface CoreInternals {
  id: number
  ship_id: number
  power_plant: string
  thrusters: string
  fsd: string
  life_support: string
  power_distributor: string
  sensor: string
  fuel_tank: string
}

export interface Hardpoint {
  id: number
  ship_id: number
  size: string
  module: string
}

export interface Optional extends Hardpoint {
  type: string
}

interface ShipStats {
  id: number
  ship_id: number
  size: string
  crew: number
  hull: number
  shield: number
  agility: number
  speed: number
  boost: number
  armour: number
  mass_lock: number
  description: string
  core: CoreInternals
  utility: number
  optionals: Optional[]
  hardpoints: Hardpoint[]
}

export default interface IShip {
  id: number
  name: string
  manufacturer: string
  key: string
  price: number
  rank: string
  stats: ShipStats
}
