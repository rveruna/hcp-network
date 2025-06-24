import { useState, useMemo } from 'react';
import styles from './SearchBar.module.css';

type Node = {
  id: string;
  label: string;
  displayName?: string;
};

type Props = {
  nodes: Node[];
  onSelect: (node: Node) => void;
};

export const SearchBar = ({ nodes, onSelect }: Props) => {
  const [term, setTerm] = useState('');

  const matches = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return [];

    const filtered = nodes.filter((n) => (n.displayName || n.id).toLowerCase().includes(t));

    console.log('[SearchBar] term:', t);
    console.log('[SearchBar] matches:', filtered.length);

    return filtered;
  }, [term, nodes]);

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search researchers..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {term && matches.length > 0 && (
        <ul className={styles.results}>
          {matches.slice(0, 10).map((node) => (
            <li key={node.id}>
              <button
                onClick={() => {
                  onSelect(node);
                  setTerm('');
                }}
              >
                {node.displayName || node.id}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
