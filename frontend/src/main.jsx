import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ColumnKeyCreator } from 'ag-grid-enterprise'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 