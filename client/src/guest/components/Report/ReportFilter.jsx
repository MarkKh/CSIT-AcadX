import React from "react";
import { Select, Button } from "@windmill/react-ui";

function ReportFilter({ selectedFilters, advisors, response, handleSelectFilter, clearFilters }) {
  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="flex flex-wrap space-x-2 items-center">

          <div className="relative flex-1 mx-2">
            <Select
              value={selectedFilters.rep_type}
              onChange={(e) => handleSelectFilter("rep_type", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
              >
              <option value="">Type</option>
              <option value="1">UT</option>
              <option value="2">COOP</option>
            </Select>
          </div>


          <div className="relative flex-1">
            <Select
              value={selectedFilters.year}
              onChange={(e) => handleSelectFilter("year", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Year</option>
              {Array.from(new Set(response.map((reportItem) => reportItem.year))).map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.status}
              onChange={(e) => handleSelectFilter("status", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Status</option>
              <option value="มีให้ยืม">มีให้ยืม</option>
              <option value="ถูกยืม">ถูกยืม</option>
              <option value="สูญหาย">สูญหาย</option>
              {/* Add more status options if needed */}
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.prominence}
              onChange={(e) => handleSelectFilter("prominence", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Prominence</option>
              <option value="โดดเด่น">โดดเด่น</option>
              <option value="-">-</option>
            </Select>
          </div>

          <div className="relative flex-1">
            <Select
              value={selectedFilters.advisor}
              onChange={(e) => handleSelectFilter("advisor", e.target.value)}
              className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <option value="">Advisor</option>
              {Object.values(advisors)
                .sort((a, b) => a.localeCompare(b)) 
                .map((advisor, index) => (
                  <option key={index} value={advisor}>
                    {advisor}
                  </option>
                ))}
            </Select>
          </div>

        </div>
        <Button layout="link" onClick={clearFilters} className="flex items-center">
          <span>Clear</span>
        </Button>

      </div>
    </>
  );
}

export default ReportFilter;
