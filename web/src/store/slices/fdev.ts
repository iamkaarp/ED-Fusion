import { createSlice } from '@reduxjs/toolkit'

export const fdevSlice = createSlice({
  name: 'fdev',
  initialState: {
    connected: false,
    verifier: null,
  },
  reducers: {
    setVerifier: (state, action) => {
      state.verifier = action.payload
    },
    setData: (state, action) => {
      state.connected = action.payload.connected
    },
  },
})

export const { setVerifier, setData } = fdevSlice.actions

export default fdevSlice.reducer
