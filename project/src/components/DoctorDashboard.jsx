import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import '../styles/DoctorDashboard.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function DoctorDashboard() {
  
  const [getEmail, setEmail] = useState(null);
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Fetch Email
  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user");
      console.log("Fetched Email:", response.data); // Debugging
      setEmail(response.data.email); // Ensure email is extracted
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  // Fetch Staff
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff");
      console.log("Fetched Staff:", response.data); // Debugging
      setStaffMembers(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // Filter Staff Members based on Email Match
  useEffect(() => {
    if (getEmail && staffMembers.length > 0) {
      console.log("Email to match:", getEmail);
      console.log("Staff Emails:", staffMembers.map((staff) => staff.email));

      const matchedStaff = staffMembers.filter(
        (staff) => staff.email.toLowerCase() === getEmail.toLowerCase()
      );

      console.log("Matched Staff:", matchedStaff);
      setFilteredStaff(matchedStaff);
    }
  }, [getEmail, staffMembers]);








  // Mock doctor data - in real app would come from auth context/API
  const doctorProfile = {
    id: 'D001',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    experience: '15 years',
    education: 'MD - Cardiology, MBBS',
    contact: '+1 234 567 8900',
    email: 'dr.wilson@hospital.com',
    schedule: 'Mon-Fri, 9:00 AM - 5:00 PM',
    rating: 4.8,
    totalPatients: 1500,
    about: 'Experienced cardiologist specializing in interventional cardiology and heart failure management.'
  };

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-26',
      time: '09:00',
      type: 'Consultation',
      status: 'scheduled',
      symptoms: 'Chest pain, shortness of breath',
      history: 'Hypertension'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-22',
      time: '10:00',
      type: 'Follow-up',
      status: 'scheduled',
      symptoms: 'Regular checkup',
      history: 'Post surgery follow-up'
    }
  ]);

  // Mock patients data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '+1 234 567 8901',
      lastVisit: '2024-03-15',
      condition: 'Hypertension',
      nextAppointment: '2024-03-22'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 38,
      gender: 'Female',
      contact: '+1 234 567 8902',
      lastVisit: '2024-03-10',
      condition: 'Post-surgery recovery',
      nextAppointment: '2024-03-22'
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      return appointment.date === format(new Date(), 'yyyy-MM-dd');
    }
    return appointment.status === filter;
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  const stats = {
    todayAppointments: appointments.filter(app => app.date === format(new Date(), 'yyyy-MM-dd')).length,
    totalPatients: patients.length,
    upcomingAppointments: appointments.filter(app => 
      new Date(app.date) >= new Date() && app.status === 'scheduled'
    ).length,
    completedAppointments: appointments.filter(app => app.status === 'completed').length
  };

  return (
  
    
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <div className="doctor-info" onClick={() => setActiveTab('profile')}>
          <div className="doctor-avatar">
            👨‍⚕️
          </div>
          <div className="doctor-details">
            <h1>{doctorProfile.name}</h1>
            <p>{doctorProfile.specialization} • {doctorProfile.department}</p>
          </div>
        </div>
        <div className="quick-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.todayAppointments}</span>
            <span className="stat-label">Today's Appointments</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalPatients}</span>
            <span className="stat-label">Total Patients</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.upcomingAppointments}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.completedAppointments}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="dashboard-content">
          <div className="section-header">
            <h2>Today's Schedule</h2>
          </div>
          <div className="appointments-list">
            {filteredAppointments
              // .filter(app => app.date === format(new Date(), 'yyyy-MM-dd'))
              .map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{appointment.patientName}</h3>
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className={`status-select ${appointment.status}`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="appointment-details">
                    <div className="detail-item">
                      <span className="icon">⏰</span>
                      <span>{appointment.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">🏥</span>
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                  <div className="medical-info" >
                    <div>
                    <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                    <p><strong>Medical History:</strong> {appointment.history}</p>
                    </div>
                    <button className="note-button" onClick={() => setIsOpen(true)}>
        Note
      </button>
                    {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Doctor's Note</h2>
            <textarea
              className="textarea"
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your notes here..."
            />
            <div className="modal-actions">
              <button className="close-button" onClick={() => setIsOpen(false)}>
                Close
              </button>
              <button 
                className="save-button"
                onClick={() => {
                  console.log("Saved Note:", note);
                  setIsOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="appointments-section">
          <div className="section-header">
            <h2>All Appointments</h2>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Appointments</option>
              <option value="today">Today's Appointments</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="appointments-list">
            {filteredAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.patientName}</h3>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className={`status-select ${appointment.status}`}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="appointment-details">
                  <div className="detail-item">
                    <span className="icon">📅</span>
                    <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">⏰</span>
                    <span>{appointment.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">🏥</span>
                    <span>{appointment.type}</span>
                  </div>
                </div>
                <div className="medical-info">
                  <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                  <p><strong>Medical History:</strong> {appointment.history}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'patients' && (
        <div className="patients-section">
          <div className="section-header">
            <h2>My Patients</h2>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="patients-list">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Last Visit</th>
                  <th>Condition</th>
                  <th>Next Appointment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.lastVisit}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.nextAppointment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <h2>Doctor Profile</h2>
            </div>
            <div className="profile-content">
              <div className="info-group">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name</label>
                  {filteredStaff.map((s) =>(

                    
                    <p>{e.email}</p>
                  ))}
                   
                  </div>
                  <div className="info-item">
                    <label>Specialization</label>
                    <p>{doctorProfile.specialization}</p>
                  </div>
                  <div className="info-item">
                    <label>Department</label>
                    <p>{doctorProfile.department}</p>
                  </div>
                  <div className="info-item">
                    <label>Experience</label>
                    <p>{doctorProfile.experience}</p>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Email</label>
                   {filteredStaff.map((e) =>(

                     
                     <p>{e.email}</p>
                  ))}

                  </div>
                  <div className="info-item">
                    <label>Contact</label>
                    <p>{doctorProfile.contact}</p>
                  </div>
                  <div className="info-item">
                    <label>Schedule</label>
                    <p>{doctorProfile.schedule}</p>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <h3>Professional Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Education</label>
                    <p>{doctorProfile.education}</p>
                  </div>
                  <div className="info-item full-width">
                    <label>About</label>
                    <p>{doctorProfile.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default DoctorDashboard;



