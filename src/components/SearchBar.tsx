import { useState } from 'react';
import { mockGraphData } from '../data/mockGraph';
import { useDispatch } from 'react-redux';
import { setSelectedHCPId } from '../features/hcpGraphSlice';

function SearchBar() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const results = mockGraphData.nodes.filter((hcp) =>
    hcp.name.toLowerCase().includes(query.toLowerCase())
  );

  console.log('Search query:', query);
  console.log('Results:', results);

  const handleSelect = (id: string) => {
    dispatch(setSelectedHCPId(id));
    setQuery('');
  };

  return (
    <div style={{ marginBottom: '1rem', padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search HCP by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '1rem',
          width: '100%',
          maxWidth: '300px',
          border: '1px solid #ccc',
          borderRadius: '6px'
        }}
      />
      {query && results.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '0.5rem',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '6px',
            maxWidth: '300px',
            maxHeight: '200px',
            overflowY: 'auto',
            position: 'absolute',
            zIndex: 10
          }}
        >
          {results.map((hcp) => (
            <li
              key={hcp.id}
              onClick={() => handleSelect(hcp.id)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                color: 'black'
              }}
            >
              {hcp.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
