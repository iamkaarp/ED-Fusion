import IStation from '../../../interfaces/IStation'
export default interface ISystemStations {
  stations: IStation[]
  column: string
  direction: string
  loading: boolean
  onSort: (column: string, direction: string) => void
}
