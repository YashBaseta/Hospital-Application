import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Search, FileText, DollarSign, Calendar, User, Shield, CreditCard, AlertCircle, IndianRupee } from 'lucide-react';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';
import "../styles/Billing.css"
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Billing() {
 const [bills, setBills] = useState([]);
 const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [filterStatus, setFilterStatus] = useState('all');
   const [formData, setFormData] = useState({
    id:"",
     patient: '',
     appointmentDate: '',
     dueDate: '',
     appointmentCost: '',
     insuranceProvider: '',
     policyNumber: '',
     coverageAmount: '',
     paymentMethod: '',
     additionalCharges: [],
     notes: '',
     status: 'pending',
     total:""
   });
 


 // Fetch Doctor
 useEffect(() => {
  fetchBills();
}, []);

const fetchBills = async () => {
  try {
    const response = await axios.get('http://localhost:5000/bill');
    setBills(response.data);
 
  
  } catch (error) {
    console.error('Error fetching Bills:', error);
  }
};








   const stats = {
     totalBills: bills.length,
     pendingAmount: bills.reduce((sum, bill) => sum + (bill.status === 'pending' ? parseFloat(bill.total) : 0), 0),
     paidToday: bills.filter(bill => 
       bill.status === 'paid' && 
       new Date(bill.paidDate).toDateString() === new Date().toDateString()
     ).reduce((sum, bill) => sum + parseFloat(bill.total), 0),
     overdueBills: bills.filter(bill => 
       bill.status === 'pending' && 
       new Date(bill.dueDate) < new Date()
     ).length
   };
 
   const addCharge = () => {
     setFormData(prev => ({
       ...prev,
       additionalCharges: [...prev.additionalCharges, { description: '', amount: '' }]
     }));
   };
 
   const removeCharge = (index) => {
     setFormData(prev => ({
       ...prev,
       additionalCharges: prev.additionalCharges.filter((_, i) => i !== index)
     }));
   };
 
   const handleChargeChange = (index, field, value) => {
     setFormData(prev => ({
       ...prev,
       additionalCharges: prev.additionalCharges.map((charge, i) => 
         i === index ? { ...charge, [field]: value } : charge
       )
     }));
   };
 
   const calculateTotal = () => {
    const appointmentCost = parseFloat(formData?.appointmentCost) || 0;
    const additionalTotal = (formData?.additionalCharges || []).reduce(
      (sum, charge) => sum + (parseFloat(charge?.amount) || 0),
      0
    );
    const coverage = parseFloat(formData?.coverageAmount) || 0;
  
    const total = appointmentCost + additionalTotal - coverage;
    return total > 0 ? total.toFixed(2) : null; // Return null if total is negative
  };
 
   
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure total is calculated before resetting formData
    const totalAmount = calculateTotal();
    console.log("Calculated Total:", totalAmount);
  
    // Include total in the request payload
    const updatedFormData = { 
      ...formData, 
      total: totalAmount 
    };
  
    const res = await axios.post(`http://localhost:5000/bill`, updatedFormData);
  
    const newBill = {
      data: res.data,
      id: Date.now(),
      ...updatedFormData, // Now this contains the correct total
      status: 'complete',
      createdAt: new Date().toISOString()
    };
  
    setBills(prev => [...prev, newBill]);
  
    generatePDF(newBill);
  
    // Reset formData AFTER setting total
    setFormData({
      id:"",
      patient: '',
      appointmentDate: '',
      dueDate: '',
      appointmentCost: '',
      insuranceProvider: '',
      policyNumber: '',
      coverageAmount: '',
      paymentMethod: '',
      additionalCharges: [],
      notes: '',
      status: 'pending',
      total: null // Reset to null after submission
    });
  };
  
 
 const generatePDF = (bill) => {
   const doc = new jsPDF();
   
   // Set title
   doc.setFont("helvetica", "bold");
   doc.setFontSize(22);
   doc.text("Medical Invoice", 20, 20);
 
   // Basic details section
   doc.setFontSize(12);
   doc.setFont("helvetica", "normal");
   doc.text(`Patient:`, 20, 40);
   doc.setFont("helvetica", "bold");
   doc.text(`${bill.patient}`, 50, 40);
 
   doc.setFont("helvetica", "normal");
   doc.text(`Appointment Date:`, 20, 50);
   doc.setFont("helvetica", "bold");
   doc.text(`${new Date(bill.appointmentDate).toLocaleDateString()}`, 60, 50);
 
   doc.setFont("helvetica", "normal");
   doc.text(`Due Date:`, 20, 60);
   doc.setFont("helvetica", "bold");
   doc.text(`${new Date(bill.dueDate).toLocaleDateString()}`, 50, 60);
 
   doc.setFont("helvetica", "normal");
   doc.text(`Total Amount:`, 20, 70);
   doc.setFont("helvetica", "bold");
   doc.text(`${bill.total}`, 55, 70);
 
   doc.setFont("helvetica", "normal");
   doc.text(`Status:`, 20, 80);
   doc.setFont("helvetica", "bold");
   doc.text(`${bill.status}`, 45, 80);
 
   let yOffset = 100; // Start position for additional charges
 
   if (bill.additionalCharges.length > 0) {
     doc.setFont("helvetica", "bold");
     doc.setFontSize(14);
     doc.text("Additional Charges", 20, yOffset);
     yOffset += 10;
 
     // Table Header
     doc.setFont("helvetica", "bold");
     doc.setFillColor(220, 220, 220); // Light gray background
     doc.rect(20, yOffset, 170, 10, "F"); // Header box
     doc.text("Description", 25, yOffset + 7);
     doc.text("Amount ($)", 140, yOffset + 7);
     yOffset += 15;
 
     // Table Content
    // Add appointment cost as the first item in the table
   doc.text("1. Appointment Fee", 25, yOffset);
   doc.text(`${bill.appointmentCost}`, 150, yOffset);
   yOffset += 10;
 
   // Additional Charges
   bill.additionalCharges.forEach((charge, index) => {
     doc.text(`${index + 2}. ${charge.description}`, 25, yOffset); // +2 to adjust numbering
     doc.text(`${charge.amount}`, 150, yOffset);
     yOffset += 10;
     });
     doc.setFont("helvetica", "bold");
     doc.text("Coverage Deduction:", 25, yOffset + 10);
     doc.text(`${bill.coverageAmount}`, 150, yOffset + 10);
     yOffset += 20;
   
  
     
   
     // Final Amount Payable
     doc.setFont("helvetica", "bold");
     doc.setFontSize(14);
     doc.text("Final Amount Payable:", 20, yOffset + 10);
     doc.text(`${bill.total}`, 150, yOffset + 10);
     yOffset += 20;
   }
 
   // Footer
   doc.setFontSize(10);
   doc.setFont("helvetica", "italic");
   doc.setTextColor(100);
   doc.text("Thank you for choosing our hospital. Get well soon!", 20, yOffset + 20);
 
  //  doc.save(`Medical_Invoice_${bill.patient}.pdf`);
   
   sendEmail(bill, doc);
 };
 
 const sendEmail = (bill, doc) => {
   
   const emailData = {
     to_email: "yash.baseta05@gmail.com", // Replace with actual email
     from_name: "Hospital Billing",
     subject: `Invoice #${bill.id}`,
     message: `Dear ${bill.patient}, please find your invoice attached.
     billID:${bill.id}          
     appointment_date:${new Date(bill.appointmentDate).toLocaleDateString()},
     due_date: ${new Date(bill.dueDate).toLocaleDateString()},
     total_amount:${ bill.total},`
     
     // pdf: doc.output('datauristring')
   };
 
   emailjs.send(
     'service_y80hf59', 
     'template_494vr0m', 
     emailData, 
     'PYsp2rge6JYGQODO2'
   )
   .then(response => {
     alert(`Invoice sent successfully! `);
   })
   .catch(error => {
     console.error("Email send error: ", error);
   });
 };
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 const handleStatusChange = async (id, newStatus) => {
  console.log("Updating status for ID:", id, "New Status:", newStatus); // Debugging log

  if (!id || !newStatus) {
    console.error("Invalid ID or Status:", id, newStatus);
    return;
  }

  try {
    // Send update request to backend
    const res = await axios.put(`http://localhost:5000/bill/${id}`, { status: newStatus });

    console.log("Server Response:", res.data); // Debug response

    // Update state in frontend
    setBills(prev =>
      prev.map(bill =>
        bill._id === id ? { ...bill, status: newStatus } : bill
      )
    );
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

 
const filteredBills = bills
.filter(bill => {
  const patientName = bill.patient ? bill.patient.toLowerCase() : '';
  const billId = bill.id ? bill.id.toString() : '';
  const search = searchTerm.trim().toLowerCase();

  const matchesSearch = patientName.includes(search) || billId.includes(search);
  const matchesStatus = filterStatus === 'all' || bill.status === filterStatus;

  return matchesSearch && matchesStatus;
})
.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   return (
     <div className="container">
       <div className="header">
         <div className="header-content">
           <div className="header-title">
             <FileText size={24} />
             <h1>Medical Billing System</h1>
           </div>
           <div className="search-bar">
             <Search size={20} />
             <input
               type="text"
               placeholder="Search bills by patient name or ID..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <select
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
               className="status-filter"
             >
               <option value="all">All Status</option>
               <option value="pending">Pending</option>
               <option value="paid">Paid</option>
               <option value="overdue">Overdue</option>
             </select>
           </div>
           
      </div>
           
 
         <div className="stats-container">
           <div className="stat-card">
             <div className="stat-icon">
               <FileText size={24} />
             </div>
             <div className="stat-info">
               <h3>Total Bills</h3>
               <p>{stats.totalBills}</p>
             </div>
           </div>
           <div className="stat-card">
             <div className="stat-icon">
             <IndianRupee  size={24} />
             </div>
             <div className="stat-info">
               <h3>Pending Amount</h3>
               <p>{stats.pendingAmount.toFixed(2)}</p>
             </div>
           </div>
           <div className="stat-card">
             <div className="stat-icon">
               <CreditCard size={24} />
             </div>
             <div className="stat-info">
               <h3>Paid Today</h3>
               <p>{stats.paidToday.toFixed(2)}</p>
             </div>
           </div>
           <div className="stat-card">
             <div className="stat-icon">
               <AlertCircle size={24} />
             </div>
             <div className="stat-info">
               <h3>Overdue Bills</h3>
               <p>{stats.overdueBills}</p>
             </div>
           </div>
         </div>
       </div>
 
       <div className="content">
         <div className="bills-list">
           <div className="section-header">
             <h2>Bills List</h2>
             <div className="bill-count">
               Showing {filteredBills.length} of {bills.length} bills
             </div>

             <Button varient="info" onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? 'Close Form' : 'Add bill'}
      </Button>
      </div>
      {isOpen && (
  <div className="create-bill"> 
            <div className="section-header">
             <h2>Create New Bill</h2>
           </div> 
           
            <form onSubmit={handleSubmit}>
             <div className="form-row">
               <div className="form-group">
                 <label>
                   <User size={16} />
                   Patient Name
                 </label>
                 <input
                   type="text"
                   className="form-control"
            placeholder="Patient's Name "
                   value={formData.patient}
                   onChange={e => setFormData(prev => ({ ...prev, patient: e.target.value }))}
                   required
                 />
               </div>
               <div className='form-group'>
               <label > Patient Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Patient's email"
            required
          />
               </div>
               <div className="form-group">
                 <label>
                   <Calendar size={16} />
                   Appointment Date
                 </label>
                 <input
                   type="date"
                   className="form-control"
                   value={formData.appointmentDate}
                   onChange={e => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                   required
                 />
               </div>
               
             </div>
 
             <div className="form-row">
               <div className="form-group">
                 <label>
                   <Calendar size={16} />
                   Due Date
                 </label>
                 <input
                   type="date"
                   className="form-control"
                   value={formData.dueDate}
                   onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                   required
                 />
               </div>
 
               <div className="form-group">
                 <label>
                 <IndianRupee size={16} />
                   Appointment Cost
                 </label>
                 <input
                   type="number"
                   className="form-control"
            placeholder="Enter Amount"
                   value={formData.appointmentCost}
                   onChange={e => setFormData(prev => ({ ...prev, appointmentCost: e.target.value }))}
                   required
                   min="0"
                   step="0.01"
                 />
               </div>
               <div className="form-group">
                 <label>
                   <Shield size={16} />
                   Insurance Provider
                 </label>
                 <input
                 placeholder="Insurance Company Name"
                   type="text"
                   className="form-control"
                   value={formData.insuranceProvider}
                   onChange={e => setFormData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                 />
               </div>
             </div>
 
             <div className="form-row">
               
 
               <div className="form-group">
                 <label>
                   <FileText size={16} />
                   Policy Number
                 </label>
                 <input
                 placeholder="Policy Number"
                   type="text"
                   className="form-control"
                   value={formData.policyNumber}
                   onChange={e => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                 />
               </div>

             
               <div className="form-group">
                 <label>
                   <IndianRupee size={16} />
                   Coverage Amount 
                 </label>
                 <input
                 placeholder="Coverage Amount"
                   type="number"
                   className="form-control"
                   value={formData.coverageAmount}
                   onChange={e => setFormData(prev => ({ ...prev, coverageAmount: e.target.value }))}
                   min="0"
                   step="0.01"
                 />
               </div>
 
               <div className="form-group">
                 <label>
                   <CreditCard size={16} />
                   Payment Method
                 </label>
                 <select
                   className="form-control"
                   value={formData.paymentMethod}
                   onChange={e => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                   required
                 >
                   <option value="">Select Payment Method</option>
                   <option value="cash">Cash</option>
                   <option value="credit">Credit Card</option>
                   <option value="debit">Debit Card</option>
                   <option value="insurance">Insurance</option>
                 </select>
               </div>
             </div>
 
             <div className="charges-section">
               <div className="section-header">
                 <h3>Additional Charges</h3>
                 <button type="button" className="btn btn-secondary" onClick={addCharge}>
                   <Plus size={16} /> Add Charge
                 </button>
               </div>
               
               {formData.additionalCharges.map((charge, index) => (
                 <div key={index} className="charge-item">
                   <input
                     type="text"
                     className="form-control"
                     placeholder="Description"
                     value={charge.description}
                     onChange={e => handleChargeChange(index, 'description', e.target.value)}
                     required
                   />
                   <input
                     type="number"
                     className="form-control"
                     placeholder="Amount"
                     value={charge.amount}
                     onChange={e => handleChargeChange(index, 'amount', e.target.value)}
                     required
                     min="0"
                     step="0.01"
                   />
                   <button
                     type="button"
                     className="btn btn-danger"
                     onClick={() => removeCharge(index)}
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
             </div>
 
             <div className="form-group">
               <label>Notes</label>
               <textarea
                 className="form-control"
                 value={formData.notes}
                 onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                 rows="3"
                 placeholder="Add any additional notes or comments..."
               ></textarea>
             </div>
 
             <div className="form-summary">
               <div className="total-amount">
                 <h3>Total Amount: {calculateTotal()}</h3>
                 {parseFloat(formData.coverageAmount) > 0 && (
                   <p className="coverage-info">
                     (Including insurance coverage of ${formData.coverageAmount})
                   </p>
                 )}
               </div>
               <button type="submit" style={ { width:"150px", height:"50px", paddingLeft:"40px" }}  className="btn btn-primary">
                 Create Bill
               </button>
             </div>
           </form> 
          </div> 









      )}


           
           <div className="table-container">
             <table className="bills-table">
               <thead>
                 <tr>
                   <th>Bill ID</th>
                   <th>Patient</th>
                   <th>Date</th>
                   <th>Due Date</th>
                   <th>Total</th>
                   <th>Insurance Cover</th>
                
                   <th>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredBills.map(bill => (
                   <tr key={bill.id} className={bill.status === 'overdue' ? 'overdue-row' : ''}>
                     <td>#{bill.id}</td>
                     <td>{bill.patient}</td>
                     <td>{new Date(bill.appointmentDate).toLocaleDateString()}</td>
                     <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                     <td>{bill.total}</td>
                     <td>{bill.coverageAmount || '0.00'}</td>
                    
                     <td>
                       <select
                         value={bill.status}
                         onChange={(e) => handleStatusChange(bill._id, e.target.value)}
                         className="status-select"
                       >
                         <option st value="pending">Pending</option>
                         <option value="paid">Paid</option>
                         <option value="overdue">Overdue</option>
                       </select>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>

       </div>
     </div>
   );
 }
export default Billing;