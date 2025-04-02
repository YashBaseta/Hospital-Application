import React, { useEffect, useState } from 'react';
import '../styles/CRUD.css';
import axios from 'axios';
import { Button } from 'antd';

function Staff() {
  const [staffMembers, setStaffMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    contact: '',
    email: '',
    password:""

  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);



// Fetch Staff
useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff');
      setStaffMembers(response.data);
   
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


  const generateRandomPassword = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };







  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = generateRandomPassword(); // Generate a random password
    const newFormData = { ...formData, password }; // Add password to form data

try{
      if (isEditing) {
        await axios.put(`http://localhost:5000/staff/${editId}`, formData);
      setStaffMembers(staffMembers.map(staff => 
        staff._id === editId ? { ...formData, id: editId } : staff
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      const res = await axios.post(`http://localhost:5000/staff`,newFormData)
      setStaffMembers([...staffMembers, res.data ]);
    }
    setFormData({ name: '', role: '', department: '', contact: '', email: '' });
    setIsEditing(false);
    setEditId(null);
    fetchStaff(); // Refresh the list
    
  }catch(error){
    console.error("Error in submiting Staff",error);
    
  }
  
}


  const handleEdit = (staff) => {
    setShowForm(!showForm)
    setIsEditing(true);
    setEditId(staff._id);
    setFormData(staff);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  

  return (
    
    <div className="crud-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h1>Staff Management</h1>
    
      <Button style={{ height: "50px", padding: "20px" }} type='primary' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Staff'}
      </Button>
   

    </div>

      {showForm && (
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
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
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            required
          />
        </div>
        <div className="form-group">
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
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map(staff => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.role}</td>
                <td>{staff.department}</td>
                <td>{staff.contact}</td>
                <td>{staff.email}</td>
                <td>
                  <button onClick={() => handleEdit(staff)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(staff._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default Staff;