import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { getUser, isLoading, setLoading, setAuth } = useAuth();

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

  // empty out any errMsg that might have when the user changes the user and pwd state
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Use Breeze login endpoint (no CSRF needed for token auth)
      const response = await axios.post("/login", { 
        email: user, 
        password: pwd 
      });
      
      console.log("Login successful:", response.status);
      console.log("Response data:", response.data);
      
      // Store the token from the response
      const token = response.data.token;
      const userData = response.data.user;
      
      if (token) {
        localStorage.setItem('auth_token', token);
        
        // Set the token in axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Set user data directly (no need for separate API call)
        setAuth(userData);
        
        // Navigate on success
        navigate(from, { replace: true });
      } else {
        setErrMsg("No token received from server");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid credentials");
      } else if (err?.response?.status === 422) {
        setErrMsgObj(err?.response?.data?.errors);
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShowPwd = () => {
    setShow(!show);
  };

  return (
    <>
      {isLoading ? (
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
