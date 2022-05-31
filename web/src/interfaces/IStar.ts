import ISystem from './ISystem'

export default interface IStar {
  id: number
  body_id: number
  name: string
  type: string
  is_main: boolean
  mass: number
  radius: number
  temperature: number
  luminosity: number
  age: number
  sub_class: number
  absolute_magnitude: number
  distance: number
  body: {
    system: ISystem
  }
  updated_at: string
}
