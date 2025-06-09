import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import './SignupForm.css';

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await API.post("/auth/signup", {
                email,
                password
            });

            alert("Signup success! Now login.");
            console.log(res.data);
        } catch (err) {
            console.error("Signup error:", err);
            if (err.response && err.response.data) {
                alert("Signup failed: " + (err.response.data.message || JSON.stringify(err.response.data)));
            } else {
                alert("Signup failed: Something went wrong");
            }
        }

    };

    return (
        <div className="container">
            <div className="heading">
                <h1>Maa-Chores</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="password">
                    <label>Re-enter Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="btn">
                    <button type="submit">SignUp</button>
                </div>
                <div className="log">
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
