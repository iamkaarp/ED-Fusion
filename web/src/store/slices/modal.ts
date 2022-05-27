import { createSlice } from '@reduxjs/toolkit'

const initialState: Record<string, boolean> = {
  search: false,
  ref: false,
  signin: false,
  signup: false,
}

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state[action.payload.modal] = true
    },
    closeModal: (state, action) => {
      state[action.payload.modal] = false
    },
  },
})

export const { openModal, closeModal } = modal.actions

export default modal.reducer
