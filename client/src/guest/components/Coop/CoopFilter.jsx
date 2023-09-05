import React from 'react';
import { Select, Button } from '@windmill/react-ui';

function CoopFilter({ response, advisors, selectedFilters, handleSelectFilter, clearFilters }) {
    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex flex-wrap space-x-2 items-center">

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.advisor_id}
                            onChange={(e) => handleSelectFilter("advisor_id", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Advisor</option>
                            {Object.values(advisors)
                                .sort((a, b) => a.localeCompare(b)) // เรียงตามตัวอักษร
                                .map((advisor, index) => (
                                    <option key={index} value={advisor}>
                                        {advisor}
                                    </option>
                                ))}
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.semester}
                            onChange={(e) => handleSelectFilter("semester", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.year}
                            onChange={(e) => handleSelectFilter("year", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Year</option>
                            {Array.from(new Set(response.map((coop) => coop.year))).map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.major}
                            onChange={(e) => handleSelectFilter("major", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Major</option>
                            <option value="วิทยาการคอมพิวเตอร์">Computer Science</option>
                            <option value="เทคโนโลยีสารสนเทศ">Information Technology</option>
                        </Select>
                    </div>

                    <div className="relative flex-1">
                        <Select
                            value={selectedFilters.province}
                            onChange={(e) => handleSelectFilter("province", e.target.value)}
                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        >
                            <option value="">Province</option>
                            {response
                                .map((coop) => coop.province)
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .sort()
                                .map((province) => (
                                    <option key={province} value={province}>
                                        {province}
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

export default CoopFilter;
