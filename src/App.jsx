import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import LeadsPage from './pages/LeadsPage'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
