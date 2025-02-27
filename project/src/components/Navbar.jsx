import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>HMS</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#patients">Patients</a></li>
        <li><a href="#doctors">Doctors</a></li>
        <li><a href="#appointments">Appointments</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;