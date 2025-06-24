// src/components/Sidebar.tsx
import styles from '../App.module.css';
import type { Node } from '../types';
import type { parseOrcidRecord } from '../utils/parseOrcidRecord';

interface SidebarProps {
  selectedNode: Node | null;
  profileData: ReturnType<typeof parseOrcidRecord> | null;
}

export function ProfileCard({ selectedNode, profileData }: SidebarProps) {
  return (
    <>
      {profileData ? (
        <div>
          <h3>{profileData.name}</h3>
          {profileData.biography && <p>{profileData.biography}</p>}
          <h4>Publications</h4>
          <ul>
            {profileData.publications.slice(0, 5).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ) : selectedNode ? (
        <p>Loading profile...</p>
      ) : (
        <div className={styles.placeholder}>
          Select a node in the graph to view profile details.
        </div>
      )}
    </>
  );
}
