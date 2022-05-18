import IStation from '../../../interfaces/IStation'
export default interface ISystemStations {
  stations: IStation[]
  loading: boolean
  column: string
  direction: string
  onSort: (column: string, direction: string) => void
}
