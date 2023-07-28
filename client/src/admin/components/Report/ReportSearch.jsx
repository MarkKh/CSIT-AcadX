import React from "react";
import { Link } from 'react-router-dom';
import { Input, Button } from "@windmill/react-ui";

function ReportSearch({search, setSearch }) {
  return (
    <div className="flex justify-between mb-4">
      <div className="relative flex-1 mr-4">
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
        />
      </div>
      <Button>
        <Link to="./report/insert">
          Add Data
        </Link>
      </Button>
    </div>
  );
}

export default ReportSearch;
