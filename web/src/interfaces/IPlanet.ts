import ISystem from './ISystem'

interface Composition {
  id: number
  body_planet_id: number
  type: string
  amount: number
  updated_at: string
}

interface Material {
  id: number
  body_planet_id: number
  type: string
  amount: number
  updated_at: string
}

export default interface IPlanet {
  id: number
  body_id: number
  mass: number
  name: string
  class: string
  atmosphere: string
  landable: boolean
  distance: number
  axial_tilt: number
  semi_major_axis: number
  eccentricity: number
  orbital_period: number
  rotation_period: number
  inclination: number
  periapsis: number
  radius: number
  surface_gravity: number
  surface_pressure: number
  surface_temperature: number
  terraform_state: string
  volcanism: string
  compositions: Composition[]
  materials: Material[]
  body: {
    system: ISystem
  }
  updated_at: string
}
