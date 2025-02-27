import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import { Hospital } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
<Hospital size={32} strokeWidth={1.25} absoluteStrokeWidth />
      
        {/* <span className="heart-icon">❤️</span> */}
        <h1>City Hospital</h1>
      </div>
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">⬛</span>
          Dashboard
        </NavLink>
        <NavLink to="/appointments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📅</span>
          Appointments
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👥</span>
          Patients
        </NavLink>
        <NavLink to="/staff" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👨‍⚕️</span>
          Staff
        </NavLink>
        <NavLink to="/facilities" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏥</span>
          Facilities
        </NavLink>
        <NavLink to="/beds" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🛏️</span>
          Beds
        </NavLink>
        <NavLink to="/supplies" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">📦</span>
          Supplies
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;