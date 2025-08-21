import React, { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaInfoCircle,
  FaTimes,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "../axiosApi/axios";
import { verifyResetToken } from "../Services/AuthServices";
import useAuth from "../hooks/useAuth";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // means requires one lowercase, one uppercase, one digit and one !@#$% and can 8-24 char

const ResetPwd = () => {
  const errRef = useRef();

  const [tokenVerified, setTokenVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchParams] = useSearchParams();
  const [successMsg, setSuccessMsg] = useState("");
  const { token } = useParams();
  const { isLoading, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(searchParams.get("email"));
    console.log(email);
  }, []);

  useEffect(() => {
    const verify = async () => {
      // getting the token in the reset-pwd URL
      // const {token} = useParams();
      // const email = searchParams.get("email");
      // console.log(email);

      if (token) {
        setResetToken(token);
        setTokenVerified(true);
      } else {
        setTokenVerified(false);
      }
    };

    verify();
  }, [searchParams, pwd, matchPwd]);

  // checking if pwd is in valid format and  match with confirmPwd
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // clear error message when try to change user || pwd || matchPwd
  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [pwd, matchPwd]);

  const from = location.state?.from?.pathname || "/login";

  const handleShowPwd = () => {
    setShow(!show);
  };

  const handleShowConfirmPwd = () => {
    setShowConfirm(!showConfirm);
  };

  const handleResetPwd = async (e) => {
    e.preventDefault();

    const v2 = PWD_REGEX.test(pwd);

    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "/reset-password",
        JSON.stringify({
          email,
          token: resetToken,
          password: pwd,
          password_confirmation: matchPwd,
        })
      );
      setLoading(false);
      // navigate("/login");
      setSuccessMsg(res?.data.status);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response.status === 400) {
        setTokenVerified(false);
      } else if (err?.response.status === 422) {
        setErrMsg(err.response.data.errors);
        setTokenVerified(false);
      }
      console.log(err);
    }
  };

  return (
    <>
      {tokenVerified ? (
        <div className="wrapper-login">
          <div className="form-container">
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              className="logo logoAlign"
            >
              LOGO
            </Link>
            <h2 className="h2Login">Reset Password</h2>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handleResetPwd} className="account-form">
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
                        color: "#F1510F",
                      }}
                    />
                  ) : (
                    <FaEye
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "15px",
                        color: "#F1510F",
                      }}
                    />
                  )}
                </div>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                  // className="instructions"
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
                  type={`${showConfirm ? "text" : "password"}`}
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
                <div onClick={handleShowConfirmPwd}>
                  {showConfirm ? (
                    <FaEyeSlash
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "15px",
                        color: "#F1510F",
                      }}
                    />
                  ) : (
                    <FaEye
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "15px",
                        color: "#F1510F",
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
                  // className="instructions"
                >
                  <FaInfoCircle />
                  Must match the first password input field.
                </p>
              </div>
              <div className="form-group">
                {isLoading ? (
                  <button type="submit" className="btnFormLoading">
                    <div>
                  <div className="loadingBtn">
                    <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
                  </div>
                </div>
                  </button>
                ) : (
                  <button type="submit" className="btnForm">
                    <span>reset</span>
                  </button>
                )}
              </div>
              <p className={successMsg ? "successMsg" : "offscreen"}>
                {successMsg}
                <div className="account-bottom">
                  <span className="txtSignUp">
                    <Link to="/login" className="txtColor">
                      Login
                    </Link>
                  </span>
                </div>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="auth_form">
          <p>Invalid token</p>
        </div>
      )}
    </>
  );
};

export default ResetPwd;
