import React, { useState } from 'react';
import { Dropdown, DropdownButton, Button, ButtonGroup, Modal, ToggleButton } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';

const FilterModal = () => {
    const months = ['Jan', 'Feb', 'March', 'April' , 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    const { addFilter } = useExpense();

    const [showModal, setShowModal] = useState(false);
    const [showFilterOnPage, setShowFilterOnPage] = useState(false);
    const [view, setView] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedQuarter, setSelectedQuarter] = useState();
    
  
    const handleViewChange = (newView) => {setView(newView);
        setSelectedMonth('');
        setSelectedQuarter('');
    };
  
    const handleMonthChange = (month) =>{ 
        setSelectedMonth(month)
    };

    const handleQuarterChange = (quarter) => { 
        setSelectedQuarter(quarter);
    };
  
    const openFilter = () => setShowModal(true);
    const closeFilter = () => setShowModal(false);
    const applyFilter = () => {
        setShowFilterOnPage(true);
        setShowModal(false);
        addFilter(view === 'Month' ? { month: selectedMonth } : { quarter: selectedQuarter });
    }
    const resetFilter = () => {
        setShowFilterOnPage(false);
        setSelectedMonth('');
        setSelectedQuarter('');
        addFilter({});
    }
  
    return (
    <div>
    <div className="d-flex flex-row spending-planner">
        
        <div className="filters">
          <Button style={{ marginLeft : '10px'}} id="dropdown-basic-button" title="Show" variant="secondary" onClick={openFilter}>
          <i className="bi bi-funnel"></i>
          </Button>
        </div>
        
  
        {/* Filter Modal */}
        <Modal show={showModal} onHide={closeFilter} centered>
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Show Spending By</h5>
            <ButtonGroup className="mb-3">
            {['Month', 'Quarter'].map((option) => (
              <Button
                key={option}
                variant={view === option ? 'primary' : 'outline-primary'}
                onClick={() => handleViewChange(option)}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
          {view === 'Month' && (
            <>
            <h5 className="mt-3">Choose Month</h5>
            <ButtonGroup className='flex-wrap'>
              {months.map((month) => (
                <Button 
                  key={month}
                  variant={selectedMonth === month ? 'primary' : 'outline-primary'}
                  onClick={() => handleMonthChange(month)}
                >
                  {month}
                </Button>
              ))}
            </ButtonGroup>
            </>
          )}

          {view === 'Quarter' && (
            <>
            <h5 className="mt-3">Choose Month</h5>
            <ButtonGroup>
              {quarters.map((quarter) => (
                <Button
                  key={quarter}
                  variant={selectedQuarter === quarter ? 'primary' : 'outline-primary'}
                  onClick={() => handleQuarterChange(quarter)}
                >
                  {quarter}
                </Button>
              ))}
            </ButtonGroup>
            </>
          )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={applyFilter} disabled={!selectedMonth && !selectedQuarter}>
              Apply
            </Button>
            <Button variant="primary" onClick={resetFilter}>
              Reset
            </Button>
          </Modal.Footer>
        </Modal>
        {showFilterOnPage && (
                <Button style={{ marginLeft : '10px'}} variant="secondary" onClick={resetFilter} >
                {view === 'Month' ? selectedMonth : selectedQuarter}
                <i style={{ marginLeft : '10px'}} className="bi bi-x-lg"></i>
                </Button>
        )}
      </div>   
    </div>
      
    );
};

export default FilterModal;