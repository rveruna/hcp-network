import ForceGraph2D from 'react-force-graph-2d'
import { mockGraphData } from '../data/mockGraph'

function GraphCanvas() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        graphData={mockGraphData}
        nodeLabel="name"
        nodeAutoColorBy="specialty"
        linkLabel="label"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
      />
    </div>
  )
}

export default GraphCanvas
