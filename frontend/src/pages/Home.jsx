import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Chart from './Chart';

const Home = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to "dashboard"

    return (
        <Container className="text-center mt-4  ">
            <h2>Welcome to the Home Page</h2>
            <ButtonGroup className="mb-4">
                <Button
                    variant={activeComponent === 'dashboard' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveComponent('dashboard')}
                >
                    Dashboard
                </Button>
                <Button
                    variant={activeComponent === 'chart' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveComponent('chart')}
                >
                    Chart
                </Button>
            </ButtonGroup>

            <div className="component-display text-start">
                {activeComponent === 'dashboard' && <Dashboard />}
                {activeComponent === 'chart' && <Chart />}
            </div>
        </Container>
    );
};

export default Home;
