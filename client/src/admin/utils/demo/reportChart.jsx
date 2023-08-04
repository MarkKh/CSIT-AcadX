import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../../components/Chart/ChartCard'
import { reportCount } from '../../../utils/routh'
import randomColor from 'randomcolor'; 

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch(reportCount)
            .then(response => response.json())
            .then(data => {
                // Extracting labels and datasets from the data
                const labels = data.map(entry => entry.year.toString());
                const datasets = [
                    {
                        label: 'UG',
                        backgroundColor: randomColor({ luminosity: 'light', format: 'rgb' }),
                        borderWidth: 1,
                        data: data.map(entry => entry.UG),
                    },
                    {
                        label: 'COOP',
                        backgroundColor: randomColor({ luminosity: 'light', format: 'rgb' }),
                        borderWidth: 1,
                        data: data.map(entry => entry.COOP),
                    },
                ];

                // Chart configuration
                const chartConfig = {
                    labels: labels,
                    datasets: datasets,
                };

                setChartData(chartConfig);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <ChartCard>
            {chartData ? (
                <>
                    <h2 className="text-gray-600 text-lg font-semibold mb-4">Report By year</h2>
                    <div className="h-64">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </>
            ) : (
                <p>Loading chart...</p>
            )}
        </ChartCard>
    );
};

export default BarChart;
