export interface HCPNode {
  id: string
  name: string
  avatar: string
  specialty: string
}

export interface HCPLink {
  source: string
  target: string
  type: 'co-author' | 'colleague'
  label: string
}

export const mockGraphData = {
  nodes: [
    { id: 'hcp-1', name: 'Dr. Alice Smith', avatar: '', specialty: 'Cardiology' },
    { id: 'hcp-2', name: 'Dr. Bob Lee', avatar: '', specialty: 'Oncology' },
    { id: 'hcp-3', name: 'Dr. Carla Reyes', avatar: '', specialty: 'Neurology' },
    { id: 'hcp-4', name: 'Dr. Daniel Novak', avatar: '', specialty: 'Endocrinology' },
  ],
  links: [
    { source: 'hcp-1', target: 'hcp-2', type: 'co-author', label: 'Co-authored 2 papers' },
    { source: 'hcp-1', target: 'hcp-3', type: 'colleague', label: 'Worked at MedCare' },
    { source: 'hcp-2', target: 'hcp-4', type: 'co-author', label: 'Co-authored 3 papers' },
  ],
}
