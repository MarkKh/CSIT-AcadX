import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartCard from '../../components/Chart/ChartCard';
import { Select } from "@windmill/react-ui";
import {getAllCoop} from '../../../utils/routh'

const CoopChart = () => {
    const [chartData, setChartData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');

    useEffect(() => {
        // Fetch data from the API
        fetch(getAllCoop)
            .then(response => response.json())
            .then(data => {
                setChartData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleYearFilter = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMajorFilter = (event) => {
        setSelectedMajor(event.target.value);
    };

    // Filter the data based on the selected year and major
    const filteredData = chartData?.filter(entry => {
        const yearMatch = !selectedYear || entry.year === parseInt(selectedYear);
        const majorMatch = !selectedMajor || entry.major === selectedMajor;
        return yearMatch && majorMatch;
    });


    // Replace "กรุงเทพมหานคร" with "Bangkok" in the filteredData
    const modifiedFilteredData = filteredData?.map((entry) => {
        if (entry.province === 'กรุงเทพมหานคร') {
            return { ...entry, province: 'Bangkok' };
        }
        return entry;
    });

    // Count the occurrences of each province in the modifiedFilteredData
    const provinceCounts = modifiedFilteredData?.reduce((acc, entry) => {
        acc[entry.province] = (acc[entry.province] || 0) + 1;
        return acc;
    }, {});

    // Sort the provinces by their counts in descending order
    const sortedProvinces = provinceCounts
        ? Object.keys(provinceCounts).sort((a, b) => provinceCounts[b] - provinceCounts[a])
        : [];

    // Select the top 3 provinces
    const topProvinces = sortedProvinces.slice(0, 3);
    const restCount = sortedProvinces.length - 3;

    // Chart configuration
    const chartConfig = {
        labels: [...topProvinces, 'Others'],
        datasets: [
            {
                data: [
                    provinceCounts?.[topProvinces[0]] || 0,
                    provinceCounts?.[topProvinces[1]] || 0,
                    provinceCounts?.[topProvinces[2]] || 0,
                    restCount,
                ],
                backgroundColor: ['#0694a2', '#7e3af2', '#ffa500', '#ff0000'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <ChartCard>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-600 text-lg font-semibold">Cooperative</h2>
                <div className="grid gap-2 grid-cols-2 md:flex items-center">
                    <Select
                        className="appearance-none w-full p-2 pr-8 bg-white rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                        value={selectedYear}
                        onChange={handleYearFilter}
                    >
                        <option value="">Years</option>
                        {chartData &&
                            Array.from(new Set(chartData.map(entry => entry.year))).map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                    </Select>
                    <Select
                        className="appearance-none w-full p-2 pr-8 bg-white rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                        value={selectedMajor}
                        onChange={handleMajorFilter}
                    >
                        <option value="">Majors</option>
                        {chartData &&
                            Array.from(new Set(chartData.map(entry => entry.major))).map(major => (
                                <option key={major} value={major}>
                                    {major}
                                </option>
                            ))}
                    </Select>
                </div>
            </div>
            <div className="h-64">
                {chartData ? (
                    <Doughnut
                        data={chartConfig}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </ChartCard>
    );
};

export default CoopChart;
