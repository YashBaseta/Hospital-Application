import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CRUD.css';
import { Button } from 'antd';


function BedManagement() {
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    number: '',
    department: '',
    status: '',
    type: '',
    floor: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm,setShowForm]=useState(false)

  // ** Fetch beds from the backend **
  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/beds');
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching beds:', error);
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
        
        await axios.put(`http://localhost:5000/beds/${editId}`, formData);
        setBeds(beds.map(bed => (bed._id === editId ? { ...formData, _id: editId } : bed)));

        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('http://localhost:5000/beds', formData);
        setBeds([...beds, res.data]);
      }

      setFormData({ number: '', department: '', status: '', type: '', floor: '' });
      setIsEditing(false);
      setEditId(null);
      fetchBeds(); // Refresh the list
    } catch (error) {
      console.error('Error submitting bed:', error);
    }
  };

  const handleEdit = (bed) => {
    setShowForm(!showForm)
    setIsEditing(true);
    setEditId(bed._id);
    setFormData(bed);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/beds/${id}`);
      fetchBeds();
    } catch (error) {
      console.error('Error deleting bed:', error);
    }
  };

  return (
    <div className="crud-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Bed Management</h1>
      <Button style={{ height: "50px", padding: "20px" }} type='primary' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Bed'}
      </Button>
    </div>

      {showForm && (
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            placeholder="Bed Number"
            required
          />
        </div>
        <div className="form-group">
          <select name="department" value={formData.department} onChange={handleInputChange} required>
            <option value="">Select Department</option>
            <option value="General Ward">General Ward</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Surgery">Surgery</option>
          </select>
        </div>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <select name="type" value={formData.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="Standard">Standard</option>
            <option value="Intensive Care">Intensive Care</option>
            <option value="Private">Private</option>
            <option value="Semi-Private">Semi-Private</option>
          </select>
        </div>
        <div className="form-group">
          <select name="floor" value={formData.floor} onChange={handleInputChange} required>
            <option value="">Select Floor</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Bed' : 'Add Bed'}
        </button>
      </form>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Bed Number</th>
              <th>Department</th>
              <th>Status</th>
              <th>Type</th>
              <th>Floor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beds.map(bed => (
              <tr key={bed.id}>
                <td>{bed.number}</td>
                <td>{bed.department}</td>
                <td>
                  <span className={`status-badge ${bed.status.toLowerCase()}`}>
                    {bed.status}
                  </span>
                </td>
                <td>{bed.type}</td>
                <td>{bed.floor}</td>
                <td>
                  <button onClick={() => handleEdit(bed)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(bed._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BedManagement;
