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

  // 🔥 instead of a boolean, use a counter
  const [loadingCount, setLoadingCount] = useState(0);

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const setLoading = (isLoading) => {
    setLoadingCount((prev) =>
      isLoading ? prev + 1 : Math.max(prev - 1, 0)
    );
  };

  const isLoading = loadingCount > 0;

  const getUser = async () => {
    setLoading(true); // increment
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        setAuth({});
        return;
      }

      const { data } = await axios.get("/api/user");
      console.log("User data received:", data);
      setAuth(data);
    } catch (error) {
      console.error("Get user error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        setAuth({});
      }
    } finally {
      setLoading(false); // decrement
    }
  };

  // Check auth once on app start
  useEffect(() => {
    getUser();
  }, []);

  const authInfo = {
    auth,
    setAuth,
    getUser,
    errMsg,
    setErrMsg,
    isLoading, // derived from counter
    setLoading,
    csrf
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authentication;
