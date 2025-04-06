import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const styles = {
        apContainer: {
            display: 'flex',
            justifyContent: 'center'as 'center',
            alignItems: 'center'as 'center',
            height: '100vh',
            backgroundColor: '#f4f6f9',
        },
        apFormWrapper: {
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '400px',
            textAlign: 'center'as 'center',
        },
        apLoginTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        apLoginLabel: {
            display: 'block'as 'block',
            fontSize: '14px',
            color: '#555',
            textAlign: 'left' as 'left',
            marginBottom: '5px',
        },
        apLoginInput: {
            width: '90%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
            marginBottom: '20px',
            transition: 'border-color 0.3s ease',
        },
        apLoginButton: {
            width: '100%',
            backgroundColor: '#0077B5',
            color: 'white',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        apLoginButtonDisabled: {
            width: '100%',
            backgroundColor: '#D6D6D6',
            color: 'white',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: 'not-allowed',
        },
        apLoginText: {
            marginTop: '15px',
            fontSize: '14px',
            color: '#555',
        },
        apLoginLink: {
            display: 'inline-block',
            marginTop: '5px',
            color: '#0077B5',
            fontSize: '14px',
            fontWeight: 'bold',
            textDecoration: 'none',
        },
        toastContainer: {
            top: '30px',
        }
    };

    return (
        <div style={styles.apContainer}>
            <div style={styles.apFormWrapper}>
                <form onSubmit={handleSubmit}>
                    <h3 style={styles.apLoginTitle}>Join Pothole Analytics<span style={{ color: "#0077B5" }}> Dashboard</span></h3>
                    
                    <label style={styles.apLoginLabel}>First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        required
                        style={styles.apLoginInput}
                    />
                    
                    <label style={styles.apLoginLabel}>Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        required
                        style={styles.apLoginInput}
                    />
                    
                    <label style={styles.apLoginLabel}>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                        style={styles.apLoginInput}
                    />
                    
                    <label style={styles.apLoginLabel}>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        style={styles.apLoginInput}
                    />
                    
                    <button
                        type="submit"
                        style={isSubmitting ? styles.apLoginButtonDisabled : styles.apLoginButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing up..." : "Join Now"}
                    </button>

                    <p style={styles.apLoginText}>Already have an account?</p>
                    <Link to="/" style={styles.apLoginLink}>Sign in</Link>
                </form>
                <ToastContainer style={styles.toastContainer} closeButton={false} />
            </div>
        </div>
    );
};

export default LoginAp;
