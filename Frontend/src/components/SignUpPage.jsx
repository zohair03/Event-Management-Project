import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user,setUser] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/api/user/signUp", {
        name: name,
        userName: username,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log("User created Successful !!");
      })
      .catch((err) => {
        console.log("error in creating user ", err);
      });

      setUser(true)
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input type="text" value={name} onChange={handleChange} name="name" />
        </label>
        <label>
          User Name
          <input
            type="text"
            value={username}
            onChange={handleChange}
            name="username"
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
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={handleChange}
            name="email"
          />
        </label>

        <button type="Submit">Sign Up</button>
      </form>
      { user && <Navigate to={"/loginPage"} />}
    </div>
  );
};

export default SignUpPage;