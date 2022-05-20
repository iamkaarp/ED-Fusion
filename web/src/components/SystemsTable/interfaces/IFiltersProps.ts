import IFilters from './IFilters'

export default interface IFiltersProps {
  filters: IFilters
  onFilter: (value: string, items?: any[]) => void
}
