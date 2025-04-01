import React, { useState } from "react";
import { RouteComponentProps, Link, useNavigate } from "@reach/router";
import "./signin.css";
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
    <div className="signin-container">
      <div className="animated-background"></div>
      <form className="signin-form" onSubmit={handleSubmit}>
        <h3>Login pothole Analytics Dashboard</h3>

        <label className="signin-label">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          className="signin-input"
          name="email"
          onChange={handleChange}
          value={formdata.email}
        />

        <label className="signin-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="signin-input"
          name="password"
          onChange={handleChange}
          value={formdata.password}
        />

        <button type="submit" className="signin-button">LOG IN</button>

        <p className="signin-text">Don't have an account?</p>
        <Link to="/login" className="signin-link">Create Account</Link>
      </form>
      <ToastContainer closeButton={false} />
    </div>
  );
};

export default Sign;
