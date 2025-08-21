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
  csrf: ()=>{}
};
export const AuthContext = createContext(initValue);

const Authentication = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user");
      console.log(data);
      setAuth(data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      setLoading(true);
      const response = await axios.post(
        "/login",
        data
        // JSON.stringify({ email: user, password: pwd })
      );
      setLoading(false);
      // console.log("running");
      // console.log(response);
      await getUser();
      // console.log(response);
      // setAuth(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        setLoading(false);
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
        setLoading(false);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
        setLoading(false);
      } else if (err?.response?.status === 422) {
        setErrMsg(err?.response?.data?.errors);
        setLoading(false);
      } else {
        setErrMsg("Login Failed");
        setLoading(false);
      }
      console.log(err)
      // errRef.current.focus();
    }
  };

  // const register = async ({...data}) => {
  //   try {
  //     const response = await axios.post(
  //       "/register",
  //       data
  //       // JSON.stringify(data)
  //     );
  //     await getUser();
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     if (err?.response) {
  //       setErrMsg("No Server Response");
  //     } else {
  //       setErrMsg("Registration Failed");
  //     }
  //     // errRef.current.focus(); // set focuc on the error for the screen reader to read or anyOther tech when their is an error
  //   }
  // };

  // useEffect(() => {
  //   const userGet = async () => {
  //     try {
  //       if (!auth) {
  //         await getUser();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   userGet();
  // }, []);

  useEffect(() => {
    // setLoading(true)
    const userGet = async () => {
      try {
        if (!auth) {
          await getUser();
          // setLoading(false)
        }
      } catch (error) {
        const res = error.response;
        if (res && res.status === 401) {
          // console.log(res.data.errors);
          // setErrors(res.data.errors);
          setLoading(false);
        }
      }
    };
    userGet();
    setLoading(false)
  }, []);

  const authInfo = {
    auth,
    setAuth,
    persist,
    setPersist,
    getUser,
    login,
    // register,
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
