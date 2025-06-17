import { useEffect, useState } from 'react';

export function useGraphData() {
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] } | null>(null);

  useEffect(() => {
    async function loadGraphML() {
      const res = await fetch('/data/interesting_candidates_v5.graphml');

      const text = await res.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');

      const nodeElems = Array.from(xml.querySelectorAll('node'));
      const edgeElems = Array.from(xml.querySelectorAll('edge'));

      const nodes = nodeElems.map((nodeEl) => {
        const id = nodeEl.getAttribute('id') || '';
        const label = nodeEl.querySelector('data')?.textContent || 'Unknown';
        return {
          id,
          name: id.split(',').pop()?.replace(/[()']/g, '').trim() || id,
          avatar: '',
          specialty: label
        };
      });

      const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

      const links = edgeElems.map((edgeEl) => {
        const sourceId = edgeEl.getAttribute('source') || '';
        const targetId = edgeEl.getAttribute('target') || '';
        const label = edgeEl.querySelector('data')?.textContent || 'related';
        return {
          source: nodeMap[sourceId],
          target: nodeMap[targetId],
          type: label.toLowerCase().replace(/ /g, '_'),
          label
        };
      });

      setGraphData({ nodes, links });
    }

    loadGraphML();
  }, []);

  return graphData;
}
