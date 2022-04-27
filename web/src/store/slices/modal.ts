import { createSlice } from '@reduxjs/toolkit'

export const modal = createSlice({
  name: 'modal',
  initialState: {
    search: false,
  },
  reducers: {
    openModal: (state) => {
      state.search = true
    },
    closeModal: (state) => {
      state.search = false
    },
  },
})

export const { openModal, closeModal } = modal.actions

export default modal.reducer
