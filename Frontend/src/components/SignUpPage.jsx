import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await api
      .post("/api/auth/signUp", {
        name: name,
        userName: username,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log("User created Successful !!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log("error in creating user ", err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
  }

  return (
    <section className="loginSection">
      <div className="login signup ">
        <div className="signupH1">
          <h1 className="loginH1">SignUp</h1>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="signupGrid">
            <div>
              <label>Name</label>
              <input
                placeholder="name"
                type="text"
                value={name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div>
              <label>Last name</label>
              <input
                placeholder="last name"
                type="text"
                value={lastName}
                onChange={handleChange}
                name="lastName"
              />
            </div>
            <div>
              <label>User Name</label>
              <input
                placeholder="user name"
                type="text"
                value={username}
                onChange={handleChange}
                name="username"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                placeholder="******"
                type="text"
                value={password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="signupGridEmail">
              <label>Email</label>
              <input
                placeholder="email"
                type="text"
                value={email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <input type="file" className="signupGridEmail" />
          </div>

          <button type="Submit" className="btn">
            Sign Up
          </button>
        </form>

        <p className="">Have an account !! <Link to="/login"className="signuptext">Login</Link></p>
      </div>
    </section>
  );
};

export default SignUpPage;
