import { createSlice } from '@reduxjs/toolkit'

export const stations = createSlice({
  name: 'stations',
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

export const { setColumn, setDirection } = stations.actions

export default stations.reducer
