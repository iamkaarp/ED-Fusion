import { createSlice } from '@reduxjs/toolkit'

export const factions = createSlice({
  name: 'factions',
  initialState: {
    column: 'influence',
    direction: 'desc',
  },
  reducers: {
    setColumn: (state, action) => {
      state.column = action.payload
    },
    setDirection: (state, action) => {
      state.direction = action.payload
    },
  },
})

export const { setColumn, setDirection } = factions.actions

export default factions.reducer
