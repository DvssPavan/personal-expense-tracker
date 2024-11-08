// src/components/DynamicPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicPieChart = ({ categorizedExpenses }) => {
    // Generate random colors for each category
    const colors = categorizedExpenses.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
    const {yearFilter} = useExpense();

    const data = {
        labels: categorizedExpenses.map((item) => item.category),
        datasets: [
            {
                label: 'Expenses by Category',
                data: categorizedExpenses.map((item) => item.totalCost),
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/0.6/, '1')),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses by Category',
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default DynamicPieChart;
