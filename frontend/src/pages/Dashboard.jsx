import React, { useState, useEffect, useRef, useCallback } from "react";
import { useExpense } from "../context/ExpenseContext";
import { useAuth } from "../context/AuthContext";
import { categories, categories_map } from "../misc/Enums";
import { AgGridReact } from "ag-grid-react";
import { addExpenseToServer, getExpenses } from "../services/expenseService";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const { expenses, loading, addExpense, setExpenses, setLoading } = useExpense();
  const { user, logout } = useAuth();
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchInitialExpenses = async () => {
      try {
        const data = await getExpenses(); // Fetch expenses with default pagination
        setExpenses(data); // Set fetched data to expenses state
      } catch (error) {
        console.error('Error fetching initial expenses:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchInitialExpenses();
    return () => {
      setExpenses([]);
    };
  }, [setExpenses, setLoading]);

  // Monitor changes in the `expenses` state
  useEffect(() => {
  }, [expenses]);

  const [columnDefs] = useState([
    { field: "id", headerName: "Row No" },
    { field: "label", headerName: "Label", filter: "agTextColumnFilter" },
    { field: "cost", headerName: "Cost" },
    { field: "date", headerName: "Date", filter: "agDateColumnFilter" },
    { field: "category", headerName: "Category" },
  ]);

  // State to manage the new row data
  const [newRow, setNewRow] = useState({
    label: "",
    cost: "",
    date: "",
    category: "",
  });

  // Handle adding a new row
  const handleAddRow = () => {
    if (newRow.label && newRow.cost && newRow.date && newRow.category) {
      addExpenseToServer({
        label: newRow.label.toString(),
        cost: parseFloat(newRow.cost),
        date: newRow.date.toString(),
        category: categories_map[newRow.category],
      });
      setExpenses((prevExpenses) => [...prevExpenses, newRow]);

      setNewRow({ label: "", cost: "", date: "", category: "" }); // Reset input fields
      alert(
        "Row added successfully, Please refresh the page to see the changes"
      );
    } else {
      console.error("Please enter values for both label, cost and date");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    gridRef.current = params.api;
    const dataSource = {
      getRows: async (params) => {
        setTimeout(() => {
          const rowThisPage = expenses.slice(params.startRow, params.endRow);
          const lastRow = expenses.length <= params.endRow ? expenses.length : -1;
          params.successCallback(rowThisPage, lastRow);
        }, 500);
      },
    };
    params.api.sizeColumnsToFit();
    params.api.setGridOption("datasource", dataSource);
  }, [expenses]);

  return (
    <div className="container w-100 mt-2">
      <div className="d-flex justify-content-between">
        <h2>
          Hello <span className="text-primary">{user}</span>, Here's your expense Dashboard!
        </h2>
        <button className="btn px-4 py-2 btn-secondary mb-3" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Table to display expenses with an option to add new rows */}
      <table className="table table-striped table-bordered mb-3">
        <thead>
          <tr>
            <th>Label</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="label"
                placeholder="Expense Label"
                className="form-control"
                value={newRow.label}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                className="form-control"
                value={newRow.cost}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="form-control"
                value={newRow.date}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                name="category"
                className="form-control"
                value={newRow.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="btn btn-primary mt-2" onClick={handleAddRow}>
                Add Row
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className="ag-theme-alpine container mt-2"
        style={{ height: 450, width: "100%" }}
      >
       {expenses.length ? <AgGridReact
          ref={gridRef}
          className="expense-data"
          rowModelType="infinite"
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
