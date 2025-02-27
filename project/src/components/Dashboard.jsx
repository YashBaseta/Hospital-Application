import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalPatients: 1250,
    todayAppointments: 48,
    availableBeds: 25,
    labTestsPending: 15
  });

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      type: 'General Checkup',
      time: '09:00 AM',
      status: 'upcoming'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      type: 'Dental',
      time: '10:30 AM',
      status: 'upcoming'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <h3>{stats.totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">📅</div>
          <div className="stat-info">
            <h3>{stats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">🛏️</div>
          <div className="stat-info">
            <h3>{stats.availableBeds}</h3>
            <p>Available Beds</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">🧪</div>
          <div className="stat-info">
            <h3>{stats.labTestsPending}</h3>
            <p>Lab Tests Pending</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="schedule-section">
          <h2>Today's Schedule</h2>
          <div className="schedule-list">
            {schedule.map((appointment) => (
              <div key={appointment.id} className="schedule-item">
                <div className="time-icon">⏰</div>
                <div className="appointment-info">
                  <h4>{appointment.patientName}</h4>
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