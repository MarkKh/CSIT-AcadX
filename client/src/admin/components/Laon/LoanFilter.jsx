import React from "react";
import { Select, Button } from "@windmill/react-ui";

function LoanFilter({ selectedFilters, response, handleSelectFilter, clearFilters }) {
    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex flex-wrap space-x-2 items-center">

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.status}
                            onChange={(e) => handleSelectFilter("status", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Select Status</option>
                            {Array.from(new Set(response.map((loanItem) => loanItem.status))).map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
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
    )
}

export default LoanFilter;
