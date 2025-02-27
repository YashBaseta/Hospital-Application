import React from 'react';
import '../styles/PatientList.css';

function PatientList() {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Fever' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Checkup' },
    { id: 3, name: 'Mike Johnson', age: 28, condition: 'Injury' },
  ];

  return (
    <div className="patient-list">
      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.condition}</td>
              <td>
                <button className="btn-view">View</button>
                <button className="btn-edit">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;