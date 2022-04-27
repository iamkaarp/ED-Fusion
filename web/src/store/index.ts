import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modal'

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
})
