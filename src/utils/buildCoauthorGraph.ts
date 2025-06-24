import type { Node, Link } from '../types/index';

function getRandomAvatar(id: string) {
  const n = Math.abs(id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 100;
  return `https://randomuser.me/api/portraits/men/${n}.jpg`; // or alternate men/women
}

export function buildCoauthorGraph(
  rawNodes: Node[],
  rawLinks: Link[]
): { nodes: Node[]; links: Link[] } {
  const nodeMap = new Map(rawNodes.map((n) => [n.id, n]));

  const researcherNodes = rawNodes
    .filter((n) => n.label === 'Researcher')
    .map((n) => ({
      ...n,
      avatarUrl: getRandomAvatar(n.id)
    }));

  const publicationToAuthors = new Map<string, string[]>();

  rawLinks.forEach((link) => {
    const sourceLabel = nodeMap.get(link.source)?.label;
    const targetLabel = nodeMap.get(link.target)?.label;

    if (
      link.label === 'AUTHORED' &&
      sourceLabel === 'Researcher' &&
      targetLabel?.includes('Publication')
    ) {
      if (!publicationToAuthors.has(link.target)) publicationToAuthors.set(link.target, []);
      publicationToAuthors.get(link.target)!.push(link.source);
    }

    if (
      link.label === 'AUTHORED' &&
      targetLabel === 'Researcher' &&
      sourceLabel?.includes('Publication')
    ) {
      if (!publicationToAuthors.has(link.source)) publicationToAuthors.set(link.source, []);
      publicationToAuthors.get(link.source)!.push(link.target);
    }
  });

  const coauthorEdges: Link[] = [];
  const seen = new Set<string>();

  publicationToAuthors.forEach((authors) => {
    for (let i = 0; i < authors.length; i++) {
      for (let j = i + 1; j < authors.length; j++) {
        const key = [authors[i], authors[j]].sort().join('--');
        if (!seen.has(key)) {
          coauthorEdges.push({
            source: authors[i],
            target: authors[j],
            label: 'COAUTHORED'
          });
          seen.add(key);
        }
      }
    }
  });

  return { nodes: researcherNodes, links: coauthorEdges };
}
