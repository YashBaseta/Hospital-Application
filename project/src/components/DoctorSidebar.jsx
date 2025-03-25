import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import { Hospital, LayoutDashboard } from "lucide-react";


function DoctorSidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
<Hospital size={32} strokeWidth={1.25} absoluteStrokeWidth />
      
      
        <h1>City Hospital</h1>
      </div>
      <nav className="nav-menu">
        <NavLink to="/doctor-dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon"><LayoutDashboard/></span>
          Dashboard
        </NavLink>
        {/* <NavLink to="/appointments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📅</span>
          Appointments
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👥</span>
          Patients
        </NavLink> */}
       
      
      </nav>
    </div>
  );
}

export default DoctorSidebar;