import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit check: ",{email:email,password:password});
    await axios
      .post(
        "http://localhost:3000/api/user/login",
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
        console.log("user loged in :", res);
        setUser(res.data.userData);
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
      {user && <Navigate to={"/"} />}
    </div>
  );
};

export default LoginPage;
