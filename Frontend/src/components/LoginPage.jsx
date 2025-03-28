import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";


const LoginPage = ({token, user}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCredentials, setUserCredentials] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        user(res.data.user);
        console.log("user: ", res.data.user);
        token(res.data.token);
        console.log("token: ", res.data.token);
        setUserCredentials({email:email,password:password})
      })
      .catch((err) => {
        console.log("error in login user ", err);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={handleChange}
            name="email"
          />
        </label>

        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={handleChange}
            name="password"
          />
        </label>

        <button type="Submit">Login</button>
      </form>
      {userCredentials ? <Navigate to="/dashboard"/> : null}
    </div>
  );
};

export default LoginPage;