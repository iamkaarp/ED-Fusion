export default interface ITable {
  loading: boolean
  column: string
  direction: string
  onSort: (column: string, direction: string) => void
}
