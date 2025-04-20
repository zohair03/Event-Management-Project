import api from "../api/axios.js";
import useAuth from "./useAuth.jsx";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await api.post("/api/auth/refresh-token");
    console.log("new accessToken => ",response.data.accessToken)
    setAuth((preValue) => {
      return { ...preValue, accessToken: response.data.accessToken };
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data.accessToken
  };

  return refresh;
};

export default useRefreshToken;
