import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { mockGraphData } from '../data/mockGraph'

function ProfileCard() {
  const selectedId = useSelector((state: RootState) => state.hcpGraph.selectedHCPId)
  const hcp = mockGraphData.nodes.find((n) => n.id === selectedId)

  if (!hcp) return null

  return (
    <div style={{
      background: '#fff',
      color: '#000',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem',
      marginLeft: '1rem',
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',

    }}>
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{hcp.name}</h2>
      <p><strong>Specialty:</strong> {hcp.specialty}</p>
    </div>
  )
}

export default ProfileCard
