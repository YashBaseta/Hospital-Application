import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import toast from 'react-hot-toast';
import '../styles/Billing.css';

function Billing() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBillForPayment, setSelectedBillForPayment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [billForm, setBillForm] = useState({
    patient_id: '',
    due_date: '',
    insurance_provider: '',
    insurance_policy_number: '',
    insurance_coverage_amount: '',
    payment_method: '',
    notes: ''
  });

  const [itemForm, setItemForm] = useState({
    description: '',
    quantity: 1,
    unit_price: '',
    category: ''
  });

  // Calculate billing statistics
  const stats = {
    totalBills: bills.length,
    pendingAmount: bills.reduce((sum, bill) => 
      sum + (bill.total_amount - bill.paid_amount), 0),
    paidToday: bills.filter(bill => 
      format(new Date(bill.updated_at), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') &&
      bill.status === 'paid'
    ).length,
    overdueBills: bills.filter(bill => 
      bill.status !== 'paid' && isAfter(new Date(), new Date(bill.due_date))
    ).length
  };

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'overdue') {
      return matchesSearch && 
        bill.status !== 'paid' && 
        isAfter(new Date(), new Date(bill.due_date));
    }
    return matchesSearch && bill.status === filterStatus;
  });

  const handleBillSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      id: Date.now().toString(),
      ...billForm,
      patient_name: "Patient Name", // In a real app, you'd get this from a patients list
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_amount: 0,
      paid_amount: 0,
      status: 'pending',
      items: []
    };
    
    setBills(prev => [...prev, newBill]);
    toast.success('Bill created successfully');
    setBillForm({
      patient_id: '',
      due_date: '',
      insurance_provider: '',
      insurance_policy_number: '',
      insurance_coverage_amount: '',
      payment_method: '',
      notes: ''
    });
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (!selectedBill) {
      toast.error('Please select a bill first');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ...itemForm,
      total: itemForm.quantity * parseFloat(itemForm.unit_price)
    };

    setBills(prev => prev.map(bill => {
      if (bill.id === selectedBill) {
        const updatedItems = [...(bill.items || []), newItem];
        const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
        return {
          ...bill,
          items: updatedItems,
          total_amount: newTotal
        };
      }
      return bill;
    }));

    toast.success('Item added successfully');
    setItemForm({
      description: '',
      quantity: 1,
      unit_price: '',
      category: ''
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedBillForPayment || !paymentAmount) return;

    setBills(prev => prev.map(bill => {
      if (bill.id === selectedBillForPayment.id) {
        const newPaidAmount = parseFloat(bill.paid_amount) + parseFloat(paymentAmount);
        const newStatus = newPaidAmount >= bill.total_amount ? 'paid' : 'partial';
        
        return {
          ...bill,
          paid_amount: newPaidAmount,
          status: newStatus,
          updated_at: new Date().toISOString(),
          payment_date: newStatus === 'paid' ? new Date().toISOString() : null
        };
      }
      return bill;
    }));

    toast.success('Payment recorded successfully');
    setShowPaymentModal(false);
    setSelectedBillForPayment(null);
    setPaymentAmount('');
  };

  const openPaymentModal = (bill) => {
    setSelectedBillForPayment(bill);
    setPaymentAmount((bill.total_amount - bill.paid_amount).toFixed(2));
    setShowPaymentModal(true);
  };

  const categories = [
    'Consultation',
    'Laboratory',
    'Medication',
    'Surgery',
    'Room Charges',
    'Equipment',
    'Other'
  ];

  // Mock patients data
  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' }
  ];

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h1>Billing Management</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search bills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Bills</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="billing-stats">
        <div className="stat-card">
          <div className="stat-title">Total Bills</div>
          <div className="stat-value">{stats.totalBills}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Pending Amount</div>
          <div className="stat-value">${stats.pendingAmount.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Paid Today</div>
          <div className="stat-value">{stats.paidToday}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Overdue Bills</div>
          <div className="stat-value">{stats.overdueBills}</div>
        </div>
      </div>

      <div className="billing-grid">
        <div className="bill-section">
          <h2>Bills List</h2>
          <div className="table-container">
            <table className="bill-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.id.slice(0, 8)}</td>
                    <td>
                      <div>
                        <div>{bill.patient_name}</div>
                        <div className="text-sm text-gray-500">{bill.contact}</div>
                      </div>
                    </td>
                    <td>{format(new Date(bill.created_at), 'dd/MM/yyyy')}</td>
                    <td>{format(new Date(bill.due_date), 'dd/MM/yyyy')}</td>
                    <td>${bill.total_amount.toFixed(2)}</td>
                    <td>${bill.paid_amount.toFixed(2)}</td>
                    <td>${(bill.total_amount - bill.paid_amount).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${bill.status}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => openPaymentModal(bill)}
                        className="btn btn-primary"
                        disabled={bill.status === 'paid'}
                      >
                        Record Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bill-section">
          <h2>Create New Bill</h2>
          <form onSubmit={handleBillSubmit} className="form-grid">
            <div className="form-group">
              <label>Patient</label>
              <select
                value={billForm.patient_id}
                onChange={(e) => setBillForm({ ...billForm, patient_id: e.target.value })}
                required
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={billForm.due_date}
                onChange={(e) => setBillForm({ ...billForm, due_date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Insurance Provider</label>
              <input
                type="text"
                value={billForm.insurance_provider}
                onChange={(e) => setBillForm({ ...billForm, insurance_provider: e.target.value })}
                placeholder="Insurance Provider"
              />
            </div>
            <div className="form-group">
              <label>Policy Number</label>
              <input
                type="text"
                value={billForm.insurance_policy_number}
                onChange={(e) => setBillForm({ ...billForm, insurance_policy_number: e.target.value })}
                placeholder="Policy Number"
              />
            </div>
            <div className="form-group">
              <label>Coverage Amount</label>
              <input
                type="number"
                value={billForm.insurance_coverage_amount}
                onChange={(e) => setBillForm({ ...billForm, insurance_coverage_amount: e.target.value })}
                placeholder="Coverage Amount"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                value={billForm.payment_method}
                onChange={(e) => setBillForm({ ...billForm, payment_method: e.target.value })}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Insurance">Insurance</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={billForm.notes}
                onChange={(e) => setBillForm({ ...billForm, notes: e.target.value })}
                placeholder="Additional Notes"
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Bill</button>
          </form>
        </div>
      </div>

      {showPaymentModal && selectedBillForPayment && (
        <div className="payment-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Payment</h3>
              <button
                className="close-button"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={selectedBillForPayment.patient_name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Total Amount</label>
                <input
                  type="text"
                  value={`$${selectedBillForPayment.total_amount.toFixed(2)}`}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Amount Paid</label>
                <input
                  type="text"
                  value={`$${selectedBillForPayment.paid_amount.toFixed(2)}`}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Payment Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  step="0.01"
                  required
                  max={selectedBillForPayment.total_amount - selectedBillForPayment.paid_amount}
                />
              </div>
              <div className="bill-actions">
                <button type="submit" className="btn btn-primary">
                  Confirm Payment
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;