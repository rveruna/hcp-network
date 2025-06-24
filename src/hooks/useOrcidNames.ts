// src/hooks/useOrcidNames.ts
import { useEffect } from 'react';
import { fetchOrcidName } from '../utils/fetchOrcidName';
import type { Node } from '../types/graph';

export function useOrcidNames(
  graphData: { nodes: Node[]; links: any[] } | null,
  setGraphData: React.Dispatch<React.SetStateAction<{ nodes: Node[]; links: any[] } | null>>
) {
  useEffect(() => {
    if (!graphData?.nodes) return;

    const sample = graphData.nodes;

    const loadNames = async () => {
      let changed = false;

      for (const node of sample) {
        if (!node.displayName) {
          const name = await fetchOrcidName(node.id);
          node.displayName = name;
          changed = true;
          await new Promise((r) => setTimeout(r, 300)); // throttle
        }
      }

      if (changed) {
        setGraphData((gd) => (gd ? { ...gd, nodes: [...gd.nodes] } : gd));
      }
    };

    loadNames();
  }, [graphData, setGraphData]);
}
