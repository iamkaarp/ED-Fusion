import { createSlice } from '@reduxjs/toolkit'

export const refSystem = createSlice({
  name: 'refSystem',
  initialState: {
    system: 'Sol',
    checked: 0,
  },
  reducers: {
    set: (state, action) => {
      state.system = action.payload.system
      state.checked = Math.floor(new Date().getTime() / 1000)
    },
  },
})

export const { set } = refSystem.actions

export default refSystem.reducer
