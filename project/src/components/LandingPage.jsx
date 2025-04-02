import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import ChatBot from './chat';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"
import '../styles/CRUD.css';
import { Bot } from 'lucide-react';



function LandingPage() {
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    status: 'Scheduled',
    phone: '',
    specialization: '',
    priority: 'Normal'
  });
  const [appointments, setAppointments] = useState([]);
 
  const [staffMembers, setStaffMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  // Fetch appointments
  useEffect(() => {
    axios.get('http://localhost:5000/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Doctor
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff');
      const doctorList = response.data.filter(staff => staff.role.toLowerCase() === "doctor")
      setStaffMembers(doctorList);
    } catch (error) {
      console.error('Error fetching Staff:', error);
    }
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;

  if (name === "phone") {
    // Allow only numbers and limit to 10 digits
    if (!/^\d*$/.test(value)) return; // Prevents non-numeric input
    if (value.length > 12 ) return; // Restrict input to 10 digits
  }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 12) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
  

    try {
          const res = await axios.post('http://localhost:5000/appointments', formData);
          toast.success(res.data.msg); // Now alert will show the correct message

          setAppointments([...appointments, res.data.appointment]); // Update state with new appointment
        } catch (error) {
          toast.error(error.response?.data?.msg || "Error adding appointment"); // Show error message if booking fails
        }
      

      setFormData({
        patient_name: '',
        doctor: '',
        date: '',
        time: '',
        type: '',
        status: 'Scheduled',
        phone: '',
        specialization: '',
        priority: 'Normal'
      });
    } 

  const appointmentTypes = [
    'General Checkup',
    'Specialist Consultation',
    'Follow-up',
    'Emergency',
    'Vaccination',
    'Lab Test',
    'Physical Therapy',
    'Dental',
    'Surgery Consultation'
  ];

  const appointmentTime = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',

  ]

  return (
    <div className="landing-page">
      <nav className="nav-bar">
        <div className="nav-logo">
          <span className="hospital-icon">🏥</span>
          <h1>City Hospital</h1>
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-link">About Us</Link>
         
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
          <h2 style={{marginBottom:"1rem"}}>Book an Appointment</h2>
          


          <form onSubmit={handleSubmit} className="crud-form" style={{gap:"0px", marginBottom:"20px"}}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleInputChange}
              placeholder="Patient Name"
              required
            />
          </div>
          <div className="form-group">

            <label>Doctor Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
              className="select-box"
            >
              <option value="">Select a Specialization</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff.department}>
                  {staff.department}
                </option>
              ))}
            </select>
          </div>




          <div className="form-group">

<label>Doctor</label>
<select
  name="doctor"
  value={formData.doctor}
  onChange={handleInputChange}
  required
  className="select-box"
>
  <option value="">Select a Doctor</option>
  {staffMembers
      .filter(staff => staff.department === formData.specialization) // Filter based on specialization
      .map(staff => (
        <option key={staff._id} value={staff.name}>
          {staff.name}
    </option>
  ))}
</select>
</div>









          <div className="form-group" >
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="select-box"
            >
              <option value="">Select Time</option>
              {appointmentTime.map(time => {
                const isBooked = appointments.some(
                  appt => appt.time === time && appt.doctor === formData.doctor && appt.date === formData.date
                );

                return (
                  <option key={time} value={time} disabled={isBooked} className={isBooked ? "booked" : ""}>
                    {time} {isBooked ? "(Booked)" : ""}
                  </option>
                );
              })}
            </select>



          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Add +91"
              required

            />
          </div>
          <button type="submit" className="btn-submit">
            {isEditing ? 'Update Appointment' : 'Add Appointment'}
          </button>
        </form>





      
        </div>

      </div>
      <div style={{position: 'fixed',
      borderRadius:"50%",
    bottom: '20px',
    left: '20px',
    background: '#0d0d0e',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    boxShadow:' 0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s'}}>
  <Bot size={30} 
  onClick={() => setShowForm(!showForm)} />
  {showForm &&(
       <div style={{
        position: 'fixed',
        bottom: '60px',
        left: '40px',
        width: '300px', // Adjust width as needed
        height: '400px', // Adjust height as needed
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        zIndex: 999,
      }}>
        <ChatBot />
      </div>

  )}
</div>
    </div>
  );
}

export default LandingPage;