import ForceGraph2D from 'react-force-graph-2d';
import { mockGraphData, type HCPLink, type HCPNode } from '../data/mockGraph';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedHCPId } from '../features/hcpGraphSlice';
import { useRef, useEffect, useState } from 'react';
import type { RootState } from '../store';
import { useGraphData } from '../hooks/useGraphData';

function GraphCanvas() {
  const dispatch = useDispatch();
  const [hoveredLinkLabel, setHoveredLinkLabel] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [clickedLink, setClickedLink] = useState<HCPLink | null>(null);
  const fgRef = useRef<any>(null);
  const selectedId = useSelector((state: RootState) => state.hcpGraph.selectedHCPId);

  useEffect(() => {
    if (!selectedId || !fgRef.current) return;

    const node = mockGraphData.nodes.find((n) => n.id === selectedId);
    if (node) {
      fgRef.current.centerAt(node.x ?? 0, node.y ?? 0, 1000);
      fgRef.current.zoom(4, 1000);
    }
  }, [selectedId]);

  const graphData = useGraphData();
  if (!graphData) return <p>Loading graph...</p>;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '600px' }}
      onMouseMove={(e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={() => ''}
        linkLabel={() => ''}
        nodeAutoColorBy="specialty"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkHoverPrecision={10}
        onNodeClick={(node: { id: string }) => {
          dispatch(setSelectedHCPId(node.id));
        }}
        onLinkHover={(link) => {
          if (link) {
            setHoveredLinkLabel(link.label);
          } else {
            setHoveredLinkLabel(null);
          }
        }}
        onLinkClick={(link: HCPLink) => {
          setClickedLink(link);
        }}
      />

      {hoveredLinkLabel && mousePos && (
        <div
          style={{
            position: 'absolute',
            top: mousePos.y - 80,
            left: mousePos.x + 10,
            background: 'white',
            color: 'black',
            padding: '6px 10px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: '0.85rem',
            pointerEvents: 'none'
          }}
        >
          {hoveredLinkLabel}
        </div>
      )}

      {clickedLink && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'white',
            color: 'black',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          <h3 style={{ marginTop: 0 }}>Connection Details</h3>
          <p>
            <strong>Label:</strong> {clickedLink.label}
          </p>
          <p>
            <strong>Type:</strong> {clickedLink.type}
          </p>
          <p>
            <strong>From:</strong> {(clickedLink.source as HCPNode)?.name}
          </p>
          <p>
            <strong>To:</strong> {clickedLink.target?.name}
          </p>
          <button
            onClick={() => setClickedLink(null)}
            style={{
              marginTop: '1rem',
              padding: '6px 12px',
              border: 'none',
              background: '#eee',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default GraphCanvas;
