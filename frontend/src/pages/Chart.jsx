import React, {useState, useEffect, useRef} from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { getTotalCostForEachCategoryForYear, getTotalExpenseForEachMonthOfTheYear, getTotalCostForEachCategoryForMonth, getTotalCostForYear } from '../services/expenseService';
import Graphs from './Graphs';
import '../styles/charts-style.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import FilterModal from '../Modal/FilterModal';

const Chart = () => {
    const { logout } = useAuth();
    const { yearFilter, addYearFilter, filters } = useExpense();
    const [selectedMonth, setSelectedMonth] = useState('');
    const [yearlyExpenses, setYearlyExpenses] = useState([]);
    const [categorizedExpenses, setCategorizedExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

    const years = [2024, 2023, 2022, 2021];
  // const [selectedYear, setSelectedYear] = useState(years[0]);

  
  const saveSelectedYear = async (year) => {
    addYearFilter(year);
    setLoading(true);
    const response = await getTotalCostForEachCategoryForYear(year);
    setCategorizedExpenses(response.data);
    // console.log('Categorized expenses:', response.data);
    setLoading(false);

  };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

  const fetchTotalExpenseForYear = async (year) => {
      try {
          const response = await getTotalCostForYear(year);
          return { year, totalExpense: response.data };
      } catch (error) {
          console.error(`Error fetching total expense for ${year}:`, error);
          return { year, totalExpense: 0 }; // Return 0 if there is an error
      }
  };

  useEffect(() => {
      const fetchAllYearlyExpenses = async () => {
          const expensePromises = years.map((year) => fetchTotalExpenseForYear(year));
          const expenses = await Promise.all(expensePromises);
          const categorizedExpenses = await getTotalCostForEachCategoryForYear(yearFilter);
          setCategorizedExpenses(categorizedExpenses.data);
          setYearlyExpenses(expenses);
          setLoading(false);
      };

      const fetchAllMontlyExpenses = async () => {

          const expenses = await getTotalExpenseForEachMonthOfTheYear(yearFilter);  
          const categorizedExpenses = await getTotalCostForEachCategoryForMonth(yearFilter, filters['month']);
          // console.log('Categorized expenses: from fetchAllMontlyExpenses ', categorizedExpenses.data);
          setCategorizedExpenses(categorizedExpenses.data);
          setYearlyExpenses(expenses.data);
          setLoading(false);
      };

      if(filters['month']) {
        fetchAllMontlyExpenses();
      }
      else{
      fetchAllYearlyExpenses();
      }
  }, [filters, yearFilter]); // Run this effect only once on component mountetIsFilterOpen(!isFilterOpen);

    return (
        <div className="container-chart ">
        <div className='container-outer-box'>
            
            <div className='container-box'>
                <h2>Hello X, </h2>
                <button className="btn btn-secondary mb-3" onClick={logout}>Logout</button>
            </div>
            <div className=" d-flex">
            <div className=" bold year-dial">
                {years.map((year) => (
                <div
                    key={year}
                    className={`year-option ${year === yearFilter ? 'selected' : ''}`}
                    onClick={() => saveSelectedYear(year)}
                >
                    {year}
                </div>
                ))}
            </div>
            <FilterModal />
            </div>
            
            
            <div className='d-flex justify-content-between'>
            {/* {console.log('Yearly expenses: from char', yearlyExpenses)}
            {console.log('Categorized expenses: from chart', categorizedExpenses)} */}
            <div className="d-flex justify-content-between">
                    {loading ? (
                        <div>Loading data...</div> // Display loading message until data is ready
                    ) :
                        (<Graphs yearlyExpenses={yearlyExpenses} categorizedExpenses={categorizedExpenses} />) // Render Graphs only when data is ready
                    }
            </div>
            </div>
        </div>
        </div>
    );
};

export default Chart;