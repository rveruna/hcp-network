import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { loadGraphML } from './utils/loadGraphML';
import { buildCoauthorGraph } from './utils/buildCoauthorGraph';
import { ProfileCard } from './components/ProfileCard';
import { GraphCanvas } from './components/GraphCanvas';
import { SearchBar } from './components/SearchBar';
import { useOrcidProfile } from './hooks/useOrcidProfile';
import { useOrcidNames } from './hooks/useOrcidNames';

type Node = { id: string; label: string; displayName?: string };
type Link = { source: string; target: string; label: string };

function App() {
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] } | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery] = useState('');
  const { profileData, fetchProfile, setProfileData } = useOrcidProfile();

  useEffect(() => {
    loadGraphML('/data/interesting_candidates_v5.graphml').then((raw) => {
      const graph = buildCoauthorGraph(raw.nodes, raw.links);
      setGraphData(graph);
    });
  }, []);

  useOrcidNames(graphData, setGraphData);

  const handleNodeClick = async (node: Node) => {
    setSelectedNode(node);
    setProfileData(null);
    await fetchProfile(node.id);
  };

  useEffect(() => {
    if (!graphData || !searchQuery.trim()) return;

    const lower = searchQuery.toLowerCase();
    const match = graphData.nodes.find((n) =>
      (n.displayName || n.id).toLowerCase().includes(lower)
    );

    if (match) {
      handleNodeClick(match);
    }
  }, [searchQuery, graphData]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.header}>PeerSpace</h2>
        {graphData && <SearchBar nodes={graphData.nodes} onSelect={handleNodeClick} />}

        <ProfileCard selectedNode={selectedNode} profileData={profileData} />
      </aside>

      <main className={styles.graphArea}>
        {graphData ? (
          <GraphCanvas
            graphData={graphData}
            onNodeClick={handleNodeClick}
            selectedNode={selectedNode}
          />
        ) : (
          'Loading graph...'
        )}
      </main>
    </div>
  );
}

export default App;
