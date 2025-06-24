import { useEffect, useState } from 'react';
// import { fetchOrcidName } from '../utils/fetchOrcidName';

const nameCache = new Map<string, string>();

function extractOrcidId(id: string): string | null {
  const match = id.match(/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]/);
  return match ? match[0] : null;
}

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

      const enrichedNodes = await Promise.all(
        nodes.map(async (node) => {
          const orcid = extractOrcidId(node.id);
          if (orcid && node.name === orcid) {
            if (nameCache.has(orcid)) {
              node.name = nameCache.get(orcid)!;
            } else {
              // const enrichedName = await fetchOrcidName(orcid);
              // if (enrichedName) {
              //   nameCache.set(orcid, enrichedName);
              //   node.name = enrichedName;
              // }
            }
          }
          return node;
        })
      );

      const nodeMap = Object.fromEntries(enrichedNodes.map((n) => [n.id, n]));

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

      setGraphData({ nodes: enrichedNodes, links });
    }

    loadGraphML();
  }, []);

  return graphData;
}
