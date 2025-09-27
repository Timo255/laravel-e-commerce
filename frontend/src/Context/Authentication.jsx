import { createContext, useState, useEffect } from "react";
import axios from "../axiosApi/axios";

const initValue = {
  auth: {},
  setAuth: () => {},
  getUser: () => {},
  errMsg: "",
  setErrMsg: () => {},
  isLoading: true,
  setLoading: () => {},
  csrf: () => {}
};

export const AuthContext = createContext(initValue);

const Authentication = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("auth_token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        // no token → user not logged in
        setAuth({});
        return;
      }

      const { data } = await axios.get("/api/user");
      console.log("User data received:", data);
      setAuth(data);
    } catch (error) {
      console.error("Get user error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token"); // clear bad token
        setAuth({});
      }
    } finally {
      setLoading(false);
    }
  };

  // Check auth once on app start
  useEffect(() => {
    getUser();
  }, []);

  const authInfo = {
    auth,
    setAuth,
    persist,
    setPersist,
    getUser,
    errMsg,
    setErrMsg,
    isLoading,
    setLoading,
    csrf
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authentication;
