// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';
import { indexMonthMap } from '../misc/Enums';

const BarChart = ({ yearlyExpenses }) => {
    const { yearFilter, filters} = useExpense();
    let db_labels = [];
    let db_data = [];
    let db_borderColors = [];
    console.log(yearlyExpenses);
    console.log(indexMonthMap);
    // console.log("Yearly expenses from BarChart", yearlyExpenses);
    if(filters['month']) {
        db_labels = yearlyExpenses.map((expense) => expense.month);
        db_data = yearlyExpenses.map((expense) => expense.totalCost);
        console.log(filters["month"]);
        db_borderColors = yearlyExpenses.map((expense) =>
        expense.month === indexMonthMap[filters['month']] ? 'rgba(0, 51, 0, 1)' : 'rgba(75, 192, 192, 1)')
    }

    else{
        db_labels = yearlyExpenses.map((expense) => expense.year);
        
        db_data = yearlyExpenses.map((expense) => expense.totalExpense);
        db_borderColors = yearlyExpenses.map((expense) =>
                expense.year === yearFilter ? 'rgba(0, 51, 0, 1)' : 'rgba(75, 192, 192, 1)')
    }

    const data = {
        labels: db_labels,
        datasets: [
            {
                label: 'Total Expenses',
                data: db_data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: db_borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Expenses by Year',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        datalabels: {
            anchor: 'end', // Position the label at the end of each bar
            align: 'end', // Align the label to the top of each bar
            formatter: (value) => `$${value}`, // Format the label to display as currency
            color: '#000', // Label color
            font: {
                weight: 'bold',
                size: 12,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
