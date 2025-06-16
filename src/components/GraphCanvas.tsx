import ForceGraph2D from 'react-force-graph-2d'
import { mockGraphData } from '../data/mockGraph'
import { useDispatch } from 'react-redux'
import { setSelectedHCPId } from '../features/hcpGraphSlice'

function GraphCanvas() {
  const dispatch = useDispatch()

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        graphData={mockGraphData}
        nodeLabel="name"
        nodeAutoColorBy="specialty"
        linkLabel="label"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        onNodeClick={(node: { id: string }) => {
          dispatch(setSelectedHCPId(node.id))
        }}
      />
    </div>
  )
}

export default GraphCanvas
