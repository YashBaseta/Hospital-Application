// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import Sidebar from './components/Sidebar';
// // import Dashboard from './components/Dashboard';
// // import Appointments from './components/Appointments';
// // import Patients from './components/Patients';
// // import Staff from './components/Staff';
// // import Facilities from './components/Facilities';
// // import BedManagement from './components/BedManagement';
// // import Supplies from './components/Supplies';
// // import './App.css';
// // import Billing from './components/billing';




// // function App() {
// //   return (
// //     <div className="app">
// //       <Sidebar/>
// //       <main className="main-content">
// //         <Routes>
// //           <Route path="/" element={<Navigate to="/dashboard" replace />} />
// //           <Route path="/dashboard" element={<Dashboard />} />
// //           <Route path="/appointments" element={<Appointments />} />
       
// //           <Route path="/patients" element={<Patients />} />
// //           <Route path="/staff" element={<Staff />} />
// //           <Route path="/facilities" element={<Facilities />} />
// //           <Route path="/beds" element={<BedManagement />} />
// //           <Route path="/supplies" element={<Supplies />} />
// //           <Route path="/billing" element={<Billing />} />
// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // }

// // export default App;
// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import Appointments from './components/Appointments';
// import Patients from './components/Patients';
// import Staff from './components/Staff';
// import Facilities from './components/Facilities';
// import BedManagement from './components/BedManagement';
// import Supplies from './components/Supplies';
// import Billing from './components/Billing';
// import Login from './pages/Login';
// import './App.css';

// // Function to check if user is authenticated
// const isAuthenticated = () => localStorage.getItem("token") !== null;

// // Get user role from localStorage
// const getUserRole = () => localStorage.getItem("role");

// // Private Route component
// const PrivateRoute = ({ allowedRoles, children }) => {
//   const role = getUserRole();
//   return isAuthenticated() && allowedRoles.includes(role) ? children : <Navigate to="/login" replace />;
// };

// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login"; // Check if it's login page


//   return (
//     <div className={isLoginPage ? "" : "app"}>
//       {!isLoginPage && isAuthenticated() && (userRole)}
//       <main className={isLoginPage ? "" : "main-content"}>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/login" element={<Login />} />

//           {/* Redirect to login if user is not authenticated */}
//           <Route path="/" element={<Navigate to={isAuthenticated() ? (getUserRole() === "admin" ? "/dashboard" : "/doctor-dashboard") : "/login"} replace />} />

//           {/* Protected Routes */}
//           <Route path="/dashboard" element={<PrivateRoute allowedRoles={["admin"]}><Dashboard /></PrivateRoute>} />
//           <Route path="/doctor-dashboard" element={<PrivateRoute allowedRoles={["doctor"]}><DoctorDashboard /></PrivateRoute>} />
//           <Route path="/appointments" element={<PrivateRoute allowedRoles={["admin", "doctor"]}><Appointments /></PrivateRoute>} />
//           <Route path="/patients" element={<PrivateRoute allowedRoles={["admin", "doctor"]}><Patients /></PrivateRoute>} />
//           <Route path="/staff" element={<PrivateRoute allowedRoles={["admin"]}><Staff /></PrivateRoute>} />
//           <Route path="/facilities" element={<PrivateRoute allowedRoles={["admin"]}><Facilities /></PrivateRoute>} />
//           <Route path="/beds" element={<PrivateRoute allowedRoles={["admin"]}><BedManagement /></PrivateRoute>} />
//           <Route path="/supplies" element={<PrivateRoute allowedRoles={["admin"]}><Supplies /></PrivateRoute>} />
//           <Route path="/billing" element={<PrivateRoute allowedRoles={["admin"]}><Billing /></PrivateRoute>} />

//           {/* Catch-all route: If no matching route, redirect to login */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminSidebar from './components/Sidebar';
import DoctorSidebar from './components/DoctorSidebar';
import Dashboard from './components/Dashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Staff from './components/Staff';
import Facilities from './components/Facilities';
import BedManagement from './components/BedManagement';
import Supplies from './components/Supplies';
import Billing from './components/Billing';
import Login from './pages/Login';
import './App.css';

// Function to check if user is authenticated
const isAuthenticated = () => localStorage.getItem("token") !== null;

// Get user role from localStorage
const getUserRole = () => localStorage.getItem("role");

// Private Route component
const PrivateRoute = ({ allowedRoles, children }) => {
  const role = getUserRole();
  return isAuthenticated() && allowedRoles.includes(role) ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const userRole = getUserRole();
  
  return (
    <div className={isLoginPage ? "" : "app"}>
      {!isLoginPage && isAuthenticated() && (
        userRole === "admin" ? <AdminSidebar /> : userRole === "doctor" ? <DoctorSidebar /> : null
      )}
      <main className={isLoginPage ? "" : "main-content"}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Redirect to respective dashboard based on role */}
          <Route path="/" element={<Navigate to={isAuthenticated() ? (userRole === "admin" ? "/dashboard" : "/doctor-dashboard") : "/login"} replace />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute allowedRoles={["admin"]}><Dashboard /></PrivateRoute>} />
          <Route path="/doctor-dashboard" element={<PrivateRoute allowedRoles={["doctor"]}><DoctorDashboard /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute allowedRoles={["admin", "doctor"]}><Appointments /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute allowedRoles={["admin", "doctor"]}><Patients /></PrivateRoute>} />
          <Route path="/staff" element={<PrivateRoute allowedRoles={["admin"]}><Staff /></PrivateRoute>} />
          <Route path="/facilities" element={<PrivateRoute allowedRoles={["admin"]}><Facilities /></PrivateRoute>} />
          <Route path="/beds" element={<PrivateRoute allowedRoles={["admin"]}><BedManagement /></PrivateRoute>} />
          <Route path="/supplies" element={<PrivateRoute allowedRoles={["admin"]}><Supplies /></PrivateRoute>} />
          <Route path="/billing" element={<PrivateRoute allowedRoles={["admin"]}><Billing /></PrivateRoute>} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
