import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import FileUpload from "../reuseable components/FileUpload.jsx";
import "./SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .post("/api/auth/signUp", {
        name: name,
        lastName: lastName,
        userName: username,
        password: password,
        email: email,
        profilePic: pic,
      })
      .then((res) => {
        console.log("User created Successful !!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log("error in creating user ", err);
      });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EventBanners");
    data.append("cloud_name", "dxtg6bwyq");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxtg6bwyq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImgUrl = await response.json();
    setPic(uploadedImgUrl.url);
  };

  return (
    <section className="signUpSection">
      <div className=" signUp ">
        <div className="signupH1">
          <h1 className="loginH1">SignUp</h1>
        </div>

        <div className="signUpFormDiv">
          <form onSubmit={handleSubmit}>
            <div className="signupGrid">
              <div>
                <label>Name</label>
                <input
                  placeholder="name"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                />
              </div>
              <div>
                <label>Last name</label>
                <input
                  placeholder="last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  name="lastName"
                />
              </div>
              <div>
                <label>User Name</label>
                <input
                  placeholder="user name"
                  type="text"
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  name="username"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  placeholder="******"
                  type="text"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                />
              </div>
              <div className="signupGridEmail">
                <label>Email</label>
                <input
                  placeholder="email"
                  type="text"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                />
              </div>

              <div className="signupGridFileUploadDiv">
                <FileUpload />
              </div>
            </div>

            <button type="Submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>

        <p>
          Have an account !!{" "}
          <Link to="/login" className="signuptext">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
