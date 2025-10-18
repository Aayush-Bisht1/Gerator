import { configureStore } from '@reduxjs/toolkit'
import devicesReducer from './devicesSlice.js'
import authReducer from './authSlice.js'

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    auth: authReducer,
  },
})