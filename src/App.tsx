import GraphCanvas from './components/GraphCanvas'
import { useSelector } from 'react-redux'
import type { RootState } from './store'
import ProfileCard from './components/ProfileCard'

function App() {
  const selected = useSelector((state: RootState) => state.hcpGraph.selectedHCPId)

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h1>Healthcare Graph</h1>
        <GraphCanvas />
        <p style={{ padding: '1rem' }}>Selected HCP ID: {selected ?? 'none'}</p>
      </div>
      <ProfileCard />
    </div>
  )
}

export default App
