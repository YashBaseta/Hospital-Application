import React, { useEffect, useState } from 'react';
import '../styles/CRUD.css';
import axios from 'axios';
import { Button } from 'antd';

function Supplies() {
  const [supplies, setSupplies] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    reorderLevel: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fetchSupplies();
  },[])

const fetchSupplies = async () => {
  try {
    const response = await axios.get('http://localhost:5000/supplies')
    setSupplies(response.data)
  } catch (error) {
    console.error(error,"Error in fetching supplies");
    
    
  }
}

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
      await axios.put(`http://localhost:5000/supplies/${editId}`,formData)
      setSupplies(supplies.map(supply => 
        supply._id === editId ? { ...formData, id: editId } : supply
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      const res = await axios.post(`http://localhost:5000/supplies`,formData)

      setSupplies([...supplies,res.data]);
    }
    setFormData({ name: '', category: '', quantity: '', unit: '', reorderLevel: '' });
    setIsEditing(false);
    setEditId(null);
    fetchSupplies();
  }catch(error){
    console.error(error);
    
  }
}

  const handleEdit = (supply) => {
    setShowForm(!showForm)
    setIsEditing(true);
    setEditId(supply._id);
    setFormData(supply);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/supplies/${id}`);
      fetchSupplies();
    } catch (error) {
      console.error('Error deleting supplies:', error);
    }
  };

  return (
      <div className="crud-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    
    <h1>Supplies Management</h1>
      <Button style={{ height: "50px", padding: "20px" }} type='primary' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Supplies'}
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
            placeholder="Supply Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            placeholder="Unit (e.g., pieces, boxes)"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleInputChange}
            placeholder="Reorder Level"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? 'Update Supply' : 'Add Supply'}
        </button>
      </form>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Reorder Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map(supply => (
              <tr key={supply.id}>
                <td>{supply.name}</td>
                <td>{supply.category}</td>
                <td>{supply.quantity}</td>
                <td>{supply.unit}</td>
                <td>{supply.reorderLevel}</td>
                <td>
                  <button onClick={() => handleEdit(supply)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(supply._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Supplies;