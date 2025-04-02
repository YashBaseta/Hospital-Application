import React, { useEffect, useState } from 'react';
import axios from "axios"
import toast from 'react-hot-toast';
import '../styles/CRUD.css';
import { Button } from 'antd';
import Sidebar from './Sidebar';

function Patients() {
 
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      address: '',
      bloodGroup: '',
      allergies: '',
      medicalHistory: '',
      emergencyContact: '',
      insuranceInfo: '',
      lastVisit: '',
      nextAppointment: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/patients');
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/patients/${editId}`, formData);
        toast.success('Patient updated successfully');
      } else {
        await axios.post('http://localhost:5000/patients', formData);
        toast.success('Patient added successfully');
      }
      setFormData({
        name: '', age: '', gender: '', contact: '', email: '', address: '',
        bloodGroup: '', allergies: '', medicalHistory: '', emergencyContact: '',
        insuranceInfo: '', lastVisit: '', nextAppointment: ''
      });
      setIsEditing(false);
      setEditId(null);
      fetchPatients();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (patient) => {
    setShowForm(!showForm)
    setIsEditing(true);
    setEditId(patient._id);
    setFormData(patient);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`http://localhost:5000/patients/${id}`);
        toast.success('Patient deleted successfully');
        fetchPatients();
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to delete patient');
      }
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterCriteria === 'all') return matchesSearch;
    if (filterCriteria === 'hasAppointment') return matchesSearch && patient.nextAppointment;
    if (filterCriteria === 'recentVisit') {
      const thirtyDaysAgo = new Date(); // Create a Date object
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Subtract 30 days
      
      return matchesSearch && new Date(patient.lastVisit) >= thirtyDaysAgo;
    }
    return matchesSearch;
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    
    <div className="crud-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h1>Patients Management</h1>
      <Button style={{ height: "50px", padding: "20px" }} type='primary' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Patient'}
      </Button>
    </div>

      {showForm && (
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact Number"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            placeholder="List any allergies"
          />
        </div>
        <div className="form-group">
          <label>Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            placeholder="Brief medical history"
          />
        </div>
        <div className="form-group">
          <label>Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            placeholder="Emergency contact details"
            required
          />
        </div>
        <div className="form-group">
          <label>Insurance Information</label>
          <input
            type="text"
            name="insuranceInfo"
            value={formData.insuranceInfo}
            onChange={handleInputChange}
            placeholder="Insurance details"
          />
        </div>
        <div className="form-group">
          <label>Last Visit</label>
          <input
            type="date"
            name="lastVisit"
            value={formData.lastVisit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Next Appointment</label>
          <input
            type="date"
            name="nextAppointment"
            value={formData.nextAppointment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>
      )}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <select value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}>
            <option value="all">All Patients</option>
            <option value="hasAppointment">Has Upcoming Appointment</option>
            <option value="recentVisit">Recent Visit (30 days)</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Blood Group</th>
              <th>Last Visit</th>
              <th>Next Appointment</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.bloodGroup}</td>
                <td>{patient.lastVisit}</td>
                <td>{patient.nextAppointment}</td>
                <td>
                  <div className="patient-details-tooltip">
                    📋
                    <div className="tooltip-content">
                      <p><strong>Email:</strong> {patient.email}</p>
                      <p><strong>Address:</strong> {patient.address}</p>
                      <p><strong>Allergies:</strong> {patient.allergies || 'None'}</p>
                      <p><strong>Medical History:</strong> {patient.medicalHistory || 'None'}</p>
                      <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
                      <p><strong>Insurance:</strong> {patient.insuranceInfo || 'None'}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <button onClick={() => handleEdit(patient)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(patient._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default Patients;