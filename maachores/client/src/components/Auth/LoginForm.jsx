import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import './LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            console.log(res.data);
        } catch (err) {
            alert("Login failed: " + err.response.data.message);
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="heading">
                <h1>Maa-Chores</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="btn">
                    <button type="submit">Login</button>
                </div>
                <div className="log">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
