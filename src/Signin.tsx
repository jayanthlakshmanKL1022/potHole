import React, { useState } from "react";
import { RouteComponentProps, Link, useNavigate } from "@reach/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sign: React.FC<RouteComponentProps> = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/auth/login", {
        email: formdata.email,
        password: formdata.password,
      });
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      console.log(res.data);
      toast.success("Successful!", { position: "top-right", autoClose: 500 });

      setTimeout(() => {
        if (res.status === 200) {
          navigate("/home");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{    display: 'flex',
      justifyContent: 'center'as 'center',
      alignItems: 'center' as 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',}}>
      <form style={{  backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',}} onSubmit={handleSubmit}>
        <h3 style={{   textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',}}>Login Pothole Analytics Dashboard</h3>

        <label style={{    display: 'block',
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#333',}}>Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          style={{    width: '90%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',}}
          name="email"
          onChange={handleChange}
          value={formdata.email}
        />

        <label style={{   display: 'block',
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#333',}}>Password</label>
        <input
          type="password"
          placeholder="Password"
          style={{    width: '90%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',}}
          name="password"
          onChange={handleChange}
          value={formdata.password}
        />

        <button type="submit" style={{    width: '96%',
    padding: '12px',
    backgroundColor: '#0077B5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',}}>LOG IN</button>

        <p style={{textAlign: 'center',
    marginTop: '10px',
    fontSize: '1rem',
    color: '#555',}}>Don't have an account?</p>
        <Link to="/login" style={{  display: 'block',
    textAlign: 'center',
    marginTop: '10px',
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '1rem',}}>Create Account</Link>
      </form>
      <ToastContainer closeButton={false} />
    </div>
  );
};


export default Sign;
