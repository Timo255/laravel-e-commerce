import React, { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaInfoCircle,
  FaTimes,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosApi/axios";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Email_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [errMsgObj, setErrMsgObj] = useState(null);
  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, setLoading, setAuth } = useAuth();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // checking if username valid format
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // checking if email valid format
  useEffect(() => {
    const result = Email_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // checking if pwd is in valid format and match with confirmPwd
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // clear error message when try to change user || pwd || matchPwd
  useEffect(() => {
    setErrMsg("");
    setErrMsgObj(null);
  }, [user, pwd, matchPwd, email]);

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation check
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = Email_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      setLoading(true);
      
      // For token-based auth, no CSRF cookie needed
      const response = await axios.post("/register", {
        name: user,
        email: email,
        password: pwd,
        password_confirmation: matchPwd,
      });

      console.log("Registration successful:", response.status);
      console.log("Response data:", response.data);

      // Store the token from the response
      const token = response.data.token;
      const userData = response.data.user;

      if (token) {
        localStorage.setItem('auth_token', token);
        
        // Set the token in axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Set user data directly
        setAuth(userData);
        
        // Navigate to home page
        navigate("/", { replace: true });
      } else {
        setErrMsg("Registration successful but no token received");
        // Navigate to login if no token
        navigate("/login");
      }

    } catch (err) {
      console.error("Registration error:", err);
      
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.status === 422) {
        setErrMsgObj(err?.response?.data?.errors);
      } else {
        setErrMsg("Registration Failed");
      }
      
      if (errRef.current) {
        errRef.current.focus();
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
          <div className="form-container">
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              className="logo logoAlign"
            >
              LOGO
            </Link>
            <h2 className="h2Login">SignUp</h2>
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
            <form onSubmit={handleSignup} className="account-form">
              <label htmlFor="username">
                Username:
                <span>
                  <FaCheck className={validName ? "valid" : "hide"} />
                </span>
                <span>
                  <FaTimes
                    className={validName || !user ? "hide" : "invalid"}
                  />
                </span>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  ref={userRef}
                  id="username"
                  placeholder="Username *"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle className="faCircle" />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, number, underscores, hyphens allowed
                </p>
              </div>

              <label htmlFor="email">
                Email:
                <span>
                  <FaCheck className={validEmail ? "valid" : "hide"} />
                </span>
                <span>
                  <FaTimes
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </span>
              </label>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address *"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle className="faCircle" />
                  Enter valid email format.
                </p>
              </div>

              <label htmlFor="password">
                Password:
                <FaCheck className={validPwd ? "valid" : "hide"} />
                <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
              </label>
              <div className="form-group">
                <input
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  id="password"
                  placeholder="Password *"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
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
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters,
                  <br /> a number and a special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FaCheck
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FaTimes
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <div className="form-group">
                <input
                  type={`${show ? "text" : "password"}`}
                  name="confirmPassword"
                  id="confirm_pwd"
                  placeholder="Confirm Password *"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
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
                <p
                  id="confirmnote"
                  className={
                    (matchFocus && !validMatch) || !validMatch
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  Must match the first password input field.
                </p>
              </div>

              <div>
                {errorMessage && (
                  <div className="errorMessage">{errorMessage}</div>
                )}
              </div>
              
              <div className="form-group">
                <button 
                  type="submit" 
                  className="btnForm"
                  disabled={!validName || !validEmail || !validPwd || !validMatch}
                >
                  <span>SignUp</span>
                </button>
              </div>
            </form>

            <div className="account-bottom">
              <span className="txtSignUp">
                Have an Account{" "}
                <Link to="/login" className="txtColor">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
