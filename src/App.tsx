import GraphCanvas from './components/GraphCanvas'
import { useSelector } from 'react-redux'
import type { RootState } from './store'

function App() {
  const selected = useSelector((state: RootState) => state.hcpGraph.selectedHCPId)

  return (
    <div>
      <h1>Healthcare Graph</h1>
      <GraphCanvas />
      <p>Selected HCP ID: {selected ?? 'none'}</p>
    </div>
  )
}

export default App
