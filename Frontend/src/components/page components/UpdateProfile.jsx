import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useApiPrivate from "../../Hooks/useApiPrivate";

const UpdateProfile = () => {
  const { auth, login } = useAuth();
  const apiPrivate = useApiPrivate();

  const [id, setId] = useState(auth?.user?._id);
  const [oldName, setName] = useState(auth?.user?.name);
  const [oldLastName, setLastName] = useState(auth?.user?.lastName);
  const [oldUserName, setUserName] = useState(auth?.user?.userName);
  const [oldProfilePic, setProfilePic] = useState(auth?.user?.profilePic);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.patch("/api/user/updateUser", {
        _id: id,
        name: oldName,
        lastName: oldLastName,
        userName: oldUserName,
        profilePic: oldProfilePic,
      });
      const {
        _id,
        name: newName,
        lastName: newLastName,
        email,
        userName: newUserName,
        role,
        profilePic: newProfilePic,
      } = response.data.newUser;

      const newUser = {
        _id,
        name: newName,
        lastName: newLastName,
        email,
        userName: newUserName,
        role,
        profilePic: newProfilePic,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      console.log("error in updating user details: ", err);
    }
  };

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
    setProfilePic(uploadedImgUrl.url);
  };

  return (
    <>
      <section className="headingSection">
        <div>
          <h1>Update Profile</h1>
        </div>
      </section>

      <section className="updateProfileSection">
        <div className="updateProfile">
          <div className="accountPic">
            <img src={auth.user.profilePic} alt="profile pic" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              value={oldName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="last name"
              value={oldLastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="user name"
              value={oldUserName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input type="file" onChange={handleFileUpload} />

            <button type="submit" className="btn">
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
