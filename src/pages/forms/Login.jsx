import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import "./form.css"; // Make sure to create this CSS file

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (email.trim() === "") {
            toast.error("Email is required");
            return;
        }
        
        if (password.trim() === "") {
            toast.error("Password is required");
            return;
        }
        
        try {
            await dispatch(loginUser({ email, password }));
            navigate("/dashboard");
        } catch (err) {
            setError("Authentication error. Please check your credentials.");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-form">
                <h1> Parisian Makeup Store</h1>
                <br />
                <h2> Authentication</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;


