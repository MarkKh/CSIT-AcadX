import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Alert
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'

import BarChart from "../utils/demo/reportChart";
import CoopChart from "../utils/demo/coopChart"

function Dashboard() {

  const [coopCount, setCoopCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [additionalCounts, setAdditionalCounts] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coopResponse = await fetch('http://localhost:3000/cooperatives');
        const coopData = await coopResponse.json();
        setCoopCount(coopData.length);

        const loanResponse = await fetch('http://localhost:3000/loans');
        const loanData = await loanResponse.json();
        setLoanCount(loanData.length)

        const reportsResponse = await fetch('http://localhost:3000/reports');
        const reportsData = await reportsResponse.json();
        const counts = reportsData.reduce((acc, item) => {
          const repTypeId = item.rep_type_id;
          acc[repTypeId] = (acc[repTypeId] || 0) + 1;
          return acc;
        }, {});
        const additionalCount1 = counts[1] || 0;
        const additionalCount2 = counts[2] || 0;
        setAdditionalCounts({ 1: additionalCount1, 2: additionalCount2 });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="UG Report" value={additionalCounts[1]}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Coop Report" value={additionalCounts[2]}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Cooperative" value={coopCount}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Loan Management" value={loanCount}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Charts</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <BarChart />
        <CoopChart />
      </div>
    </>
  )
}

export default Dashboard
