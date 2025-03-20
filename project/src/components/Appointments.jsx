import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"
import '../styles/CRUD.css';
import { Button, Flex } from 'antd';
import Sidebar from './Sidebar';

function Appointments() {
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    status: 'Scheduled',
    phone: '',
    duration: '30',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update appointment
        await axios.put(`http://localhost:5000/appointments/${editId}`, formData);
        setAppointments(appointments.map(appt => (appt._id === editId ? { ...formData, _id: editId } : appt)));
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new appointment
        try {
          const res = await axios.post('http://localhost:5000/appointments', formData);
          toast.success(res.data.msg); // Now alert will show the correct message

          setAppointments([...appointments, res.data.appointment]); // Update state with new appointment
        } catch (error) {
          toast.error(error.response?.data?.msg || "Error adding appointment"); // Show error message if booking fails
        }
      }

      setFormData({
        patient_name: '',
        doctor: '',
        date: '',
        time: '',
        type: '',
        status: 'Scheduled',
        phone: '',
        duration: '30',
        priority: 'Normal'
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (appointment) => {
    setShowForm(!showForm)
    setIsEditing(true);
    setEditId(appointment._id);
    setFormData(appointment);
  };

  const handleDelete = async (id) => {

    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://localhost:5000/appointments/${id}`);
        setAppointments(appointments.filter(appt => appt._id !== id));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };



  const handleStatusChange = async (id, newStatus) => {
    try {
      // Send update request to backend
      await axios.put(`http://localhost:5000/appointments/${id}`, { status: newStatus });

      // Update state in frontend
      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePriority = async (id, newPriority) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}`, { priority: newPriority })
      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt._id === id ? { ...appt, priority: newPriority } : appt
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }







  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return appointment.date === today;
    }
    return appointment.status === filter;
  });

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

    <div className="crud-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Appointments Management</h1>
      <Button style={{ height: "50px", padding: "20px" }} type='primary' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Appointment'}
      </Button>
    </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="crud-form">
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

            <label>Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleInputChange}
              required
              className="select-box"
            >
              <option value="">Select a Doctor</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff.name}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
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
            <label>Duration (minutes)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            >

              <option value="30">30</option>

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
              placeholder="Phone"
              required

            />
          </div>
          <button type="submit" className="btn-submit">
            {isEditing ? 'Update Appointment' : 'Add Appointment'}
          </button>
        </form>)}

      <div className="filter-section">
        <label>Filter Appointments: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Appointments</option>
          <option value="today">Today's Appointments</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>

        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.type}</td>
                <td>{appointment.duration} min</td>
                <td>
                  <select value={appointment.priority} onChange={(e) => handlePriority(appointment._id, e.target.value)} className={`priority-badge ${appointment.priority.toLowerCase()}`}>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                    className={`status-select ${appointment.status.toLowerCase()}`}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>

                  </select>
                </td>
                <td>
                  {appointment.phone && (
                    <div className="phone-tooltip">
                      <span className="tooltip-text">{appointment.phone}</span>
                    </div>
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(appointment)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(appointment._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default Appointments;
