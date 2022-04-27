import IFaction from '../../../interfaces/IFaction'
import IStation from '../../../interfaces/IStation'
export default interface ISystemFactions {
  factions: any
  stations: IStation[]
  column: string
  direction: string
  loading: boolean
  onSort: (column: string, direction: string) => void
}
