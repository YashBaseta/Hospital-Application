import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/CRUD.css';

function Facilities() {
  const [facilities, setFacilities] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    capacity: '',
    location: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/facilities');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching Facilities:', error);
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
    try{
    if (isEditing) {
      await axios.put(`http://localhost:5000/facilities/${editId}`, formData);
      setFacilities(facilities.map(facility => 
        facility._id === editId ? { ...formData, id: editId } : facility
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      const res = await axios.post(`http://localhost:5000/facilities`,formData)
      setFacilities([...facilities, res.data ]);
    }
    setFormData({ name: '', type: '', status: '', capacity: '', location: '' });
    setIsEditing(false);
    setEditId(null);
    fetchFacilities();
  }catch(error){
    console.error(error);
    
  }}

  const handleEdit = (facility) => {
    setIsEditing(true);
    setEditId(facility._id);
    setFormData(facility);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/facilities/${id}`);
      fetchFacilities();
    } catch (error) {
      console.error('Error deleting facilities:', error);
    }
  };

  return (
    <div className="crud-container">
      <h1>Facilities Management</h1>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Facility Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Facility Type"
            required
          />
        </div>
        <div className="form-group">
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Capacity"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Facility' : 'Add Facility'}
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map(facility => (
              <tr key={facility.id}>
                <td>{facility.name}</td>
                <td>{facility.type}</td>
                <td>{facility.status}</td>
                <td>{facility.capacity}</td>
                <td>{facility.location}</td>
                <td>
                  <button onClick={() => handleEdit(facility)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(facility._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Facilities;