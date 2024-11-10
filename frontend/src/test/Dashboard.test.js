// src/test/Dashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseProvider } from '../context/ExpenseContext';
import Dashboard from '../pages/Dashboard';
import MockAuthProvider from './MockAuthProvider'; // Import the mock provider
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Mock axios get request to return a resolved promise with some mock data
    axios.get.mockResolvedValue({
      data: [
        { id: 1, label: 'Groceries', cost: 50, date: '2023-01-01', category: 'Food' }
      ]
    });

    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    window.alert.mockRestore();
    jest.clearAllMocks(); // Clears any mock implementations between tests
  });

  it('renders without crashing', () => {
    render(
      <MockAuthProvider>
        <ExpenseProvider>
          <Dashboard />
        </ExpenseProvider>
      </MockAuthProvider>
    );
    expect(screen.getByText(/expense Dashboard/i)).toBeInTheDocument();
  });

  it('displays an alert when a new expense is added', () => {
    render(
      <MockAuthProvider>
        <ExpenseProvider>
          <Dashboard />
        </ExpenseProvider>
      </MockAuthProvider>
    );

    const labelInput = screen.getByPlaceholderText('Expense Label');
    const costInput = screen.getByPlaceholderText('Cost');
    const dateInput = screen.getByPlaceholderText('Date');
    // const categorySelect = screen.getByPlaceholderText('Category');
    const categorySelect = screen.getByRole('combobox');
    const addButton = screen.getByText('Add Row');

    fireEvent.change(labelInput, { target: { value: 'Groceries' } });
    fireEvent.change(costInput, { target: { value: '50' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(categorySelect, { target: { value: 'Food & Dining' } });
    
    fireEvent.click(addButton);

    expect(window.alert).toHaveBeenCalledWith('Row added successfully, Please refresh the page to see the changes');
  });
});
