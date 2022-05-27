import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import modalReducer from './slices/modal'
import sortReducer from './slices/sort'
import refSystemReducer from './slices/refSystem'
import userReducer from './slices/user'
import fdevReducer from './slices/fdev'

const reducer = combineReducers({
  modal: modalReducer,
  sort: sortReducer,
  refSystem: refSystemReducer,
  user: userReducer,
  fdev: fdevReducer,
})

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

const persistConfig = {
  key: 'edfusion',
  storage,
  whitelist: ['user', 'refSystem', 'fdev'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: customizedMiddleware,
})

export default store
