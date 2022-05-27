import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: '',
    profile: {
      image: '',
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token
    },
    setName: (state, action) => {
      state.name = action.payload.name
    },
    setProfile: (state, action) => {
      state.profile = action.payload.profile
    },
    signout: (state) => {
      state.token = null
      state.name = ''
      state.profile = {
        image: '',
      }
    },
  },
})

export const { setToken, setName, setProfile } = userSlice.actions

export default userSlice.reducer
