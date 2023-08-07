import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../../components/Chart/ChartCard';
import axios from 'axios';
import { reportCount2 } from '../../../utils/routh';
import { Select } from "@windmill/react-ui";
import randomColor from 'randomcolor'; // Import the randomcolor library

const Graph = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedData, setSelectedData] = useState('UG'); // Default to UG
  const [years, setYears] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear !== '') {
      fetchFilteredData(selectedYear);
    }
  }, [selectedYear, selectedData]); // Add selectedData to the dependencies array

  const fetchData = async () => {
    try {
      const response = await axios.get(reportCount2);
      const dataFromApi = response.data;
      setData(dataFromApi);
      const uniqueYears = [...new Set(dataFromApi.map(item => item.year))];
      setYears(uniqueYears);
      setSelectedYear(uniqueYears[uniqueYears.length - 1]); // Set the last year as the selectedYear
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilteredData = (year) => {
    const filteredData = data.filter(item => item.year === year);

    // Generate random colors for each label
    const backgroundColors = filteredData.map(() => randomColor({ luminosity: 'light',format: 'rgb' }));

    const chartData = {
      labels: filteredData.map(item => item.Advisor),
      datasets: [
        {
          label: selectedData, // Use the selectedData as the label
          backgroundColor: backgroundColors,
          borderColor: '#FFFFFF',
          borderWidth: 1,
          data: filteredData.map(item => (selectedData === 'UG' ? item.UG : item.COOP)), // Use the selectedData for the appropriate data field
        },
      ],
    };
    setChartData(chartData);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  const chartOptions = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,
                min: 0
            }
        }]
    },
  };

  return (
    <ChartCard>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-600 text-lg font-semibold">Advisors UG and COOP Participation over the Years</h2>
          <div className="grid gap-2 grid-cols-2 md:flex items-center">
            <Select
              className="appearance-none w-full p-2 pr-8 bg-white rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              value={selectedYear}
              onChange={handleYearChange}>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </Select>
            <Select
              className="appearance-none w-full p-2 pr-8 bg-white rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              value={selectedData}
              onChange={handleDataChange}>
              <option value="UG">UG</option>
              <option value="COOP">COOP</option>
            </Select>
          </div>
        </div>
        <div className="">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </ChartCard>
  );
};

export default Graph;
