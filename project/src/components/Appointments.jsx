import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"
import '../styles/CRUD.css';

function Appointments() {
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    status: 'Scheduled',
    notes: '',
    duration: '30',
    priority: 'Normal'
  });
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch appointments
  useEffect(() => {
    axios.get('http://localhost:5000/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

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
      }}

      setFormData({
        patient_name: '',
        doctor: '',
        date: '',
        time: '',
        type: '',
        status: 'Scheduled',
        notes: '',
        duration: '30',
        priority: 'Normal'
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (appointment) => {
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
  
const handlePriority = async (id,newPriority) => {
  try {
    await axios.put(`http://localhost:5000/appointments/${id}` ,{priority: newPriority})
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
      <h1>Appointments Management</h1>
      
      
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
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            placeholder="Doctor"
            required
          />
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
>
    <option value="">Select Time</option>
    {appointmentTime.map(time => {
        // Check if the selected doctor already has an appointment at this time
        const isBooked = appointments.some(appt => appt.time === time && appt.doctor === formData.doctor && appt.date === formData.date);
        
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
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Additional notes"
            rows="3"
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Appointment' : 'Add Appointment'}
        </button>
      </form>

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
              <th>Notes</th>
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
                  <select value={appointment.priority} onChange={(e) =>handlePriority(appointment._id, e.target.value)} className={`priority-badge ${appointment.priority.toLowerCase()}`}>
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
                  {appointment.notes && (
                    <div className="notes-tooltip">
                      📝
                      <span className="tooltip-text">{appointment.notes}</span>
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