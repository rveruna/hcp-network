import styles from '../App.module.css';
import { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

type Node = {
  id: string;
  label: string;
  displayName?: string;
  avatarUrl?: string;
  img?: HTMLImageElement;
  x?: number;
  y?: number;
};

type Link = { source: string; target: string; label: string };

type GraphBoxProps = {
  graphData: { nodes: Node[]; links: Link[] };
  onNodeClick: (node: Node) => void;
};

// ...

export function GraphCanvas({
  graphData,
  onNodeClick,
  selectedNode
}: GraphBoxProps & { selectedNode: Node | null }) {
  const fgRef = useRef<any>(null);

  useEffect(() => {
    if (selectedNode && fgRef.current) {
      // Pan and zoom to the selected node
      const node = graphData.nodes.find((n) => n.id === selectedNode.id);
      if (node && node.x != null && node.y != null) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(4, 1000);
      }
    }
  }, [selectedNode, graphData]);

  return (
    <div className={styles.graphBox}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={(node) => (node as Node).displayName || (node as Node).id}
        nodeAutoColorBy="label"
        linkLabel={(link) => (link as Link).label}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        onNodeClick={onNodeClick}
        nodeCanvasObject={(node, ctx) => {
          const { x = 0, y = 0 } = node;
          const radius = 12;
          const avatarUrl = (node as Node).avatarUrl;

          // Draw a path first so click detection works
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#eee'; // fallback background
          ctx.fill();
          ctx.strokeStyle = '#444';
          ctx.stroke();

          if (avatarUrl) {
            const image = new Image();
            image.src = avatarUrl;
            image.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
              ctx.clip();
              ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
              ctx.restore();
            };
          }
        }}
      />
    </div>
  );
}
