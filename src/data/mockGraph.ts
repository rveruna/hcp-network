export interface HCPNode {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  x?: number;
  y?: number;
}

export interface HCPLink {
  source: HCPNode;
  target: HCPNode;
  type: 'co-author' | 'colleague';
  label: string;
}

export const nodes: HCPNode[] = [
  { id: 'hcp-1', name: 'Dr. Alice Smith', avatar: '', specialty: 'Cardiology' },
  { id: 'hcp-2', name: 'Dr. Bob Lee', avatar: '', specialty: 'Oncology' },
  { id: 'hcp-3', name: 'Dr. Carla Reyes', avatar: '', specialty: 'Neurology' },
  { id: 'hcp-4', name: 'Dr. Daniel Novak', avatar: '', specialty: 'Endocrinology' }
];

export const links: HCPLink[] = [
  {
    source: nodes[0],
    target: nodes[1],
    type: 'co-author',
    label: 'Co-authored 2 papers'
  },
  {
    source: nodes[0],
    target: nodes[2],
    type: 'colleague',
    label: 'Worked at MedCare'
  },
  {
    source: nodes[1],
    target: nodes[3],
    type: 'co-author',
    label: 'Co-authored 3 papers'
  }
];

export const mockGraphData = {
  nodes,
  links
};
