import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modal'
import sortReducer from './slices/sort'

export default configureStore({
  reducer: {
    modal: modalReducer,
    sort: sortReducer,
  },
})
