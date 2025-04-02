import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import axios from 'axios';
function Dashboard() {
  const navigate = useNavigate();
const [currentTime, setCurrentTime] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);


const [ appointmentCount,setAppointmentCount] = useState(0);
const [ patientCount,setPatientCount] = useState(0);
const [ bedCount,setBedCount] = useState(0);
const [ billCount,setbillCount] = useState(0);

// Fetch Staff
useEffect(() => {
  fetchApp();
  fetchPatient();
  fetchBed();
  // fetchBill();
}, []);

const fetchApp = async () => {
  try {
    const response = await axios.get('http://localhost:5000/appointments');
    setAppointments(response.data);
    setAppointmentCount(response.data.length);
  } catch (error) {
    console.error('Error fetching Staff:', error);
  }
};

const fetchPatient = async () => {
  try {
    const response = await axios.get('http://localhost:5000/patients');
    setPatientCount(response.data.length);
  } catch (error) {
    console.error('Error fetching Staff:', error);
  }
};


const fetchBed = async () => {
  try {
    const response = await axios.get('http://localhost:5000/beds');
    const totalBeds = 25;
    const availableBeds = totalBeds - response.data.length;
    setBedCount(availableBeds);
  } catch (error) {
    console.error('Error fetching Beds:', error);
  }
};


// const fetchBill = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/bills');
//     setbillCount(response.data.length);
//   } catch (error) {
//     console.error('Error fetching Staff:', error);
//   }
// };







  const handleQuickAction = (action) => {
    switch (action) {
      case 'appointment':
        navigate('/appointments');
        break;
      case 'patient':
        navigate('/patients');
        break;
      case 'staff':
        navigate('/staff');
        break;
      case 'supply':
        navigate('/supplies');
        break;
      default:
        break;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

 
  return (
    
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="last-updated">Last updated: {formatTime(currentTime)}</p>
      </div>

      <div className="stats-grid" >
        <div className="stat-card"  onClick={() => navigate("/patients")}>
          <div className="stat-icon blue" >👥</div>
          <div className="stat-info">
            <h3 style={{fontSize:""}} >{patientCount}</h3>
            <p style={{fontSize:"20px"}}>Total Patients</p>
          </div>
        </div>

        <div className="stat-card"  onClick={() => navigate("/appointments")}>
          <div className="stat-icon green">📅</div>
          <div className="stat-info">
            <h3>{appointmentCount}</h3>
            <p style={{fontSize:"20px"}}>Today's Appointments</p>
          </div>
        </div>

        <div className="stat-card"  onClick={() => navigate("/beds")}>
          <div className="stat-icon purple">🛏️</div>
          <div className="stat-info">
            <h3>{bedCount}</h3>
            <p style={{fontSize:"20px"}}>Available Beds</p>
          </div>
        </div>

        <div className="stat-card"  onClick={() => navigate("/billing")}>
          <div className="stat-icon yellow">💰</div>
          <div className="stat-info">
            <h3>{billCount}</h3>
            <p style={{fontSize:"20px"}}>Pending Bills</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="schedule-section">
          <h2>Today's Schedule</h2>
          <div className="schedule-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="schedule-item">
                <div className="time-icon">⏰</div>
                <div className="appointment-info">
                  <h4>{appointment.patient_name}</h4>
                  <p>{appointment.type}</p>
                  <span className="time">{appointment.time}</span>
                </div>
                <span className={`status ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-btn blue"
              onClick={() => handleQuickAction('appointment')}
            >
              <span className="action-icon">📅</span>
              <span>New Appointment</span>
            </button>
            <button 
              className="action-btn green"
              onClick={() => handleQuickAction('patient')}
            >
              <span className="action-icon">👥</span>
              <span>Add Patient</span>
            </button>
            <button 
              className="action-btn purple"
              onClick={() => handleQuickAction('staff')}
            >
              <span className="action-icon">👨‍⚕️</span>
              <span>Add Staff</span>
            </button>
            <button 
              className="action-btn orange"
              onClick={() => handleQuickAction('supply')}
            >
              <span className="action-icon">📦</span>
              <span>Add Supply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Dashboard;