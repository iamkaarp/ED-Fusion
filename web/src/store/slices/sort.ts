import { createSlice } from '@reduxjs/toolkit'

interface SortState {
  column: string
  direction: string
}

const initialState: Record<string, SortState> = {
  stations: {
    column: 'updated_at',
    direction: 'desc',
  },
  orbital: {
    column: 'updated_at',
    direction: 'desc',
  },
  planetary: {
    column: 'updated_at',
    direction: 'desc',
  },
  fleetCarriers: {
    column: 'updated_at',
    direction: 'desc',
  },
  factions: {
    column: 'influence',
    direction: 'desc',
  },
  stars: {
    column: 'distance',
    direction: 'desc',
  },
  planets: {
    column: 'distance',
    direction: 'asc',
  },
  market: {
    column: 'name',
    direction: 'asc',
  },
  outfitting: {
    column: 'name',
    direction: 'asc',
  },
}

export const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setColumn: (state, action) => {
      state[action.payload.type].column = action.payload.column
    },
    setDirection: (state, action) => {
      state[action.payload.type].direction = action.payload.direction
    },
  },
})

export const { setColumn, setDirection } = sort.actions

export default sort.reducer
