import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface HCPGraphState {
  selectedHCPId: string | null
}

const initialState: HCPGraphState = {
  selectedHCPId: null,
}

export const hcpGraphSlice = createSlice({
  name: 'hcpGraph',
  initialState,
  reducers: {
    setSelectedHCPId: (state, action: PayloadAction<string | null>) => {
      state.selectedHCPId = action.payload
    },
  },
})

export const { setSelectedHCPId } = hcpGraphSlice.actions
export default hcpGraphSlice.reducer
