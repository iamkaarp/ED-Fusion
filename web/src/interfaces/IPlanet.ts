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
  compositions: Composition[]
  materials?: Material[]
  updated_at: string
}
