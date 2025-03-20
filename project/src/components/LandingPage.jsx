import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/LandingPage.css';

function LandingPage() {
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    duration: '30',
    priority: 'Normal',
    notes: ''
  });

  const handleInputChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Appointment request submitted successfully!');
    setAppointmentForm({
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      type: '',
      duration: '30',
      priority: 'Normal',
      notes: ''
    });
  };

  return (
    <div className="landing-page">
      <nav className="nav-bar">
        <div className="nav-logo">
          <span className="hospital-icon">🏥</span>
          <h1>City Hospital</h1>
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
         
        </div>
      </nav>

      <div className="main-content">
        <div className="hero-section">
          <h1>Your Health is Our Priority</h1>
          <p>Book your appointment online and skip the waiting line. Our expert medical staff is here to provide you with the best care possible.</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📅</span>
              <span>Easy Scheduling</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⏰</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="appointment-section">
          <h2>Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="patientName"
                  value={appointmentForm.patientName}
                  onChange={handleInputChange}
                  placeholder="Patient Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="doctor"
                  value={appointmentForm.doctor}
                  onChange={handleInputChange}
                  placeholder="Doctor"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="time"
                  name="time"
                  value={appointmentForm.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  name="type"
                  value={appointmentForm.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="duration"
                  value={appointmentForm.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <select
                  name="priority"
                  value={appointmentForm.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <textarea
                  name="notes"
                  value={appointmentForm.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes"
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;