import api from "../api/axios.js";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth.jsx";

const LoginPage = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      login(accessToken, user);
      navigate(from, { replace: true });
    } catch (err) {
      console.log("error in login api: ", err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Email:</label>
        <input
          ref={emailRef}
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="Submit">Login</button>
      </form>
      <p>
        Need an account?
        <br />
        <Link to="/signUp" className="navbartext button">
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
