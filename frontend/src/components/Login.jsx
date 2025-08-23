import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, getUser, isLoading, setLoading,auth,csrf } = useAuth();

 

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [errMsgObj, setErrMsgObj] = useState(null);
  const [show, setShow] = useState(false);
  // const csrf = () => axios.get("/sanctum/csrf-cookie");

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // console.log(errMsg);

  // empty out any errMsg that might have when the user changes the user and pwd state
  useEffect(() => {
    setErrMsg("");
    // setLoading(false);
  }, [user, pwd]);

  //  const getUser = async () => {
  //     // setLoading(true);
  //     const { data } = await axios.get("/api/user");
  //     console.log(data)
  //     setAuth(data);
  //     // setLoading(false);
  //   };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login({ email: user, password: pwd });
  //     navigate(from, { replace: true });
  //     setUser("");
  //     setPwd("");
  //   } catch (error) {
  //     console.log(error);
  //     //  if (!err?.response) {
  //     //   setErrMsg("No Server Response");
  //     // } else if (err.response?.status === 400) {
  //     //   setErrMsg("Missing Username or Password");
  //     // } else if (err.response?.status === 401) {
  //     //   setErrMsg("Unauthorized");
  //     // } else if (err?.response?.status === 422) {
  //     //   setErrMsg(err?.data?.errors);
  //     // } else {
  //     //   setErrMsg("Login Failed");
  //     // }
  //     // errRef.current.focus();
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    // await csrf();
    // await csrf();
    try {
      setLoading(true);
      const response = await axios.post(
        "/login",
        { email: user, password: pwd }
        // JSON.stringify({ email: user, password: pwd })
      );
      await getUser();
      navigate(from, { replace: true });
      setLoading(false);
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
        setErrMsgObj(err?.response?.data?.errors);
        setLoading(false);
      } else {
        setErrMsg("Login Failed");
        setLoading(false);
      }
      console.log(err);
      // errRef.current.focus();
    }
  };

  const handleShowPwd = () => {
    setShow(!show);
  };

  //  if(auth?.name){
  //   return <Navigate to={"/"} state={{ from: location }} replace/>
  // }

  return (
    <>
      {isLoading ? (
        // <h1>loading..</h1>
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : (
        <div className="wrapper-login">
          {errMsgObj ? (
            Object.keys(errMsgObj).map((key) => (
              <p
                key={key}
                ref={errRef}
                className={errMsgObj ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsgObj[key][0]}
              </p>
            ))
          ) : (
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}

          <div className="form-container loginPad">
            <Link to="/" onClick={() => window.scroll(0, 0)} className="logo">
              LOGO
            </Link>
            <h2 className="h2Login">Login</h2>
            <form className="account-form" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  id="email"
                  // ref={userRef}
                  placeholder="Email Address *"
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password *"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
                <div onClick={handleShowPwd}>
                  {show ? (
                    <FaEyeSlash
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "15px",
                      }}
                    />
                  ) : (
                    <FaEye
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "15px",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="rmFrPwd">
                  <Link to="/forgot-pwd" className="pwdForget">
                    Forget Password?
                  </Link>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btnForm">
                  <span>Login</span>
                </button>
              </div>
            </form>

            <div className="account-bottom">
              <span className="txtSignUp">
                Don't Have an Account{" "}
                <Link to="/sign-up" className="txtColor">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
