// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { getExpenses } from '../services/expenseService';

const Login = () => {
  const { login, setIsAuthenticated, setUserName } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = btoa(`${credentials.username}:${credentials.password}`);
        // const response = await ; // Replace with your login endpoint
        login(token, credentials.username);
        await getExpenses();
        navigate('/home');
    } catch (error) {
        setIsAuthenticated(false);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
