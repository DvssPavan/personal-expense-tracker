import React, {useState, useRef} from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import BarChart from './BarChart';
import PieChart from './PieChart';

ChartJS.register(
    BarElement, // Required for Bar charts
    CategoryScale, // x-axis for Bar chart
    LinearScale, // y-axis for Bar chart
    Title, 
    Tooltip, 
    Legend,
    ChartDataLabels,
    ArcElement // Required for Pie chart
);

const Graphs = ({yearlyExpenses, categorizedExpenses}) => {
    const { logout } = useAuth();
    // console.log("In Graphs");
    // console.log("Year expenesses from Graphs", yearlyExpenses);
    // console.log("Categorized expenses from Graphs", categorizedExpenses);

    return (
    <div>
        {yearlyExpenses ? <BarChart yearlyExpenses={yearlyExpenses} /> : <p>Sorry, no yearly expenses </p>}
        {categorizedExpenses ? <PieChart categorizedExpenses = {categorizedExpenses}/> : <p>Sorry, no monthly expenses for the selected month</p>}
    </div>
    );
};

export default Graphs;