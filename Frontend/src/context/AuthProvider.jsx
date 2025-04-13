import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodeData = localStorage.getItem("user");
    const user = JSON.parse(decodeData);
    const accessToken = localStorage.getItem("token");

    if (user && accessToken) {
      setAuth({ user, accessToken });
    }

    setLoading(false);
  }, []);

  const login = (accessToken, user) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ user, accessToken });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
