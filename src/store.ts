import { configureStore } from '@reduxjs/toolkit'
import hcpGraphReducer from './features/hcpGraphSlice'

export const store = configureStore({
  reducer: {
    hcpGraph: hcpGraphReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
