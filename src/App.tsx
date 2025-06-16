import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'
import { setSelectedHCPId } from './features/hcpGraphSlice'

function App() {
  const dispatch = useDispatch()
  const selected = useSelector((state: RootState) => state.hcpGraph.selectedHCPId)

  return (
    <div>
      <h1>Redux Test</h1>
      <p>Selected HCP ID: {selected ?? 'none'}</p>
      <button onClick={() => dispatch(setSelectedHCPId('hcp-123'))}>
        Select HCP
      </button>
      <button onClick={() => dispatch(setSelectedHCPId(null))}>
        Clear
      </button>
    </div>
  )
}

export default App
