import React from 'react';
import { Input } from '@windmill/react-ui';

function AdvisorSearch({ search, setSearch }) {
    return (
        <div className="flex justify-between mb-4">
            <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
            />
        </div>
    );
}

export default AdvisorSearch;
