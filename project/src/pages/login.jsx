import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        toast.success("Login successful!");
        if (data.user.role === "admin") {
            navigate("/dashboard");
          } else if (data.user.role === "doctor") {
            navigate("/doctor-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          toast.error(data.msg);
        }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
         <div className="auth-card">
           <div className="auth-header">
             <h2>Welcome Back</h2>
             <p>Login to access your account</p>
           </div>
           
           <form onSubmit={handleSubmit} className="auth-form">
             <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 required
               />
             </div>
             
             <div className="form-group">
               <label htmlFor="password">Password</label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleInputChange}
                 required
               />
             </div>
             
             <button type="submit" className="btn-submit">
               Login
             </button>
           </form>
           
           <div className="auth-footer">
             <p>Only staff can access the Admin Panel.</p>
             <Link to="/" className="back-to-home">Back to Home</Link>
           </div>
         </div>
       </div>
  );
};

export default Login;
