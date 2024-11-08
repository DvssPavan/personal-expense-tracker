import React, {useState, useRef} from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useAuth } from '../context/AuthContext';
import BarChart from './BarChart';
import PieChart from './PieChart';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title, 
    Tooltip, 
    Legend,
    ChartDataLabels,
    ArcElement
);

const Graphs = ({yearlyExpenses, categorizedExpenses}) => {
    const { logout } = useAuth();

    return (
    <div style={{ width: '400px', height: '400px' }}>
        {yearlyExpenses ? <BarChart yearlyExpenses={yearlyExpenses} /> : <p>Sorry, no yearly expenses </p>}
        {categorizedExpenses ? <PieChart categorizedExpenses = {categorizedExpenses}/> : <span className="text-danger">Sorry, no expenses for your selection</span>}
    </div>
    );
};

export default Graphs;