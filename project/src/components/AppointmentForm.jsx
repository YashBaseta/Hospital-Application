import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"
import '../styles/CRUD.css';


function AppointmentForm(params) {



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
        const doctorList= response.data.filter(staff => staff.role.toLowerCase() === "doctor" )
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
          }}
    
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
        setIsEditing(true);
        setEditId(appointment._id);
        setFormData(appointment);
      };
    
      
    
     
   

    
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











    return(


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
    
  />
</div>
<button type="submit" className="btn-submit">
  {isEditing ? 'Update Appointment' : 'Add Appointment'}
</button>
</form> 
    )
}


export default AppointmentForm;