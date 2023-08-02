import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartCard from '../../components/Chart/ChartCard'
import { reportCount } from '../../../utils/routh'

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
                        backgroundColor: '#0694a2',
                        borderWidth: 1,
                        data: data.map(entry => entry.UG),
                    },
                    {
                        label: 'COOP',
                        backgroundColor: '#7e3af2',
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
