import { createContext, useState } from "react";
import axios from "../axiosApi/axios";
import { useEffect } from "react";

const initValue = {
  auth: {},
  setAuth: () => {},
  getUser: () => {},
  login: () => {},
  register: () => {},
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
      const { data } = await axios.get("/api/user");
      console.log("User data received:", data);
      setAuth(data);
    } catch (error) {
      console.error("Get user error:", error);
      if (error.response?.status === 401) {
        // User not authenticated, clear auth
        setAuth({});
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ ...data }) => {
    try {
      setLoading(true);
      
      // Get CSRF token first
      await csrf();
      
      // Login request
      const response = await axios.post("/login", data);
      console.log("Login response:", response.status);
      
      // Get user data after successful login
      await getUser();
      
    } catch (err) {
      console.error("Login error:", err);
      
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials");
      } else if (err?.response?.status === 422) {
        setErrMsg(err?.response?.data?.errors);
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Try to get user data without login
        const { data } = await axios.get("/api/user");
        console.log("Already authenticated user:", data);
        setAuth(data);
        
      } catch (error) {
        console.log("User not authenticated on app start");
        // User not authenticated, that's fine
        setAuth({});
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const authInfo = {
    auth,
    setAuth,
    persist,
    setPersist,
    getUser,
    login,
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
