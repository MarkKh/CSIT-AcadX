import React from "react";
import { Input } from "@windmill/react-ui";

function ReportSearch({ search, setSearch, dataToExcel }) {
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
  return (
    <div className="flex justify-between mb-4 mt-6">
      <div className="relative flex-1 mr-4 ">
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
        />
      </div>
      <span style={badgeStyle} className="ml-2">
        Found {dataToExcel.length} item
      </span>
    </div>
  );
}

export default ReportSearch;
