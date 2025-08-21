import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosApi/axios";
import useAuth from "../hooks/useAuth";

const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const { csrf, setLoading, isLoading } = useAuth();

  // clear error message when try to change email || pwd || matchPwd
  useEffect(() => {
    setErrorMsg("");
  }, [email]);

  const handleForgetPwd = async (e) => {
    e.preventDefault();
    await csrf();

    try {
      setLoading(true);
      const res = await axios.post(
        "/forgot-password",
        JSON.stringify({ email })
      );
      setLoading(false);
      setSuccessMsg(res.data.status);
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg("Email or emailname not found");
      } else if (err.response?.status === 422) {
        setErrorMsg(err.response.data.errors);
      }
      console.log(err);
    }
  };

  return (
    <div className="wrapper-login">
      <div className="form-container">
        <Link
          to="/"
          onClick={() => window.scroll(0, 0)}
          className="logo logoAlign"
        >
          LOGO
        </Link>
        {/* <h2 className="h2Login">Login</h2> */}
        <form className="account-form" onSubmit={handleForgetPwd}>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <div className="form-group">
            <input
              type="text"
              //   ref={emailRef}
              placeholder="Enter email or emailname *"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            {isLoading ? (
              <button type="submit" className="btnFormLoading" disabled>
                <div>
                  <div className="loadingBtn">
                    <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
                  </div>
                </div>
              </button>
            ) : (
              <button type="submit" className="btnForm">
                <span>submit</span>
              </button>
            )}
          </div>
          <p className={successMsg ? "successMsg" : "offscreen"}>
            {successMsg}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPwd;
