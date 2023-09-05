import React from 'react';
import { Input } from '@windmill/react-ui';

const badgeStyle = {
  backgroundColor: 'lavender', 
  color: 'purple', 
  padding: '4px 8px', 
  borderRadius: '10px', 
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function CoopSearch({ search, setSearch, countData }) {
  return (
    <div className="flex justify-between mb-4">
      <div className="relative flex-1 mr-4">
        <div className="flex">
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none flex-1"
          />
          <span style={badgeStyle} className="ml-2">
            Found {countData.length} item
          </span>
        </div>
      </div>
    </div>
  );
}

export default CoopSearch;
