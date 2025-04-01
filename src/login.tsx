import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"; 
import { Link } from "@reach/router";
import axios from 'axios';
import { RouteComponentProps } from "@reach/router";

const LoginAp: React.FC<RouteComponentProps> = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await axios.post("http://localhost:5500/auth/register", formData);
            console.log(res.data);
            toast.success("Registered Successfully!", { autoClose: 500 });
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.log(error);
            toast.error("Unexpected error!", { autoClose: 500 });
        } finally {
            setTimeout(() => setIsSubmitting(false), 1500);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="ap-container">
            <div className="ap-form-wrapper">
                <form className="ap-login-form" onSubmit={handleSubmit}>
                    <h3 className="ap-login-title">Join Pothole Analytics<span style={{ color: "#0077B5" }}> Dashboard</span></h3>
                    
                    <label className="ap-login-label">First Name</label>
                    <input type="text" placeholder="Enter your First Name" name="firstName" onChange={handleChange} value={formData.firstName} required className="ap-login-input" />
                    
                    <label className="ap-login-label">Last Name</label>
                    <input type="text" placeholder="Enter your Last Name" name="lastName" onChange={handleChange} value={formData.lastName} required className="ap-login-input" />
                    
                    <label className="ap-login-label">Email</label>
                    <input type="email" placeholder="Enter your Email" name="email" onChange={handleChange} value={formData.email} required className="ap-login-input" />
                    
                    <label className="ap-login-label">Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" onChange={handleChange} value={formData.password} required className="ap-login-input" />
                    
                    <button type="submit" className="ap-login-button" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up..." : "Join Now"}
                    </button>

                    <p className="ap-login-text">Already have an account?</p>
                    <Link to="/" className="ap-login-link">Sign in</Link>
                </form>
                <ToastContainer closeButton={false} />
            </div>
        </div>
    );
};

export default LoginAp;
