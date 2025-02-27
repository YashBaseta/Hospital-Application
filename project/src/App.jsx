import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Staff from './components/Staff';
import Facilities from './components/Facilities';
import BedManagement from './components/BedManagement';
import Supplies from './components/Supplies';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/beds" element={<BedManagement />} />
          <Route path="/supplies" element={<Supplies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;