import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = ({ children }) => {
  // const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, getUser, setLoading, isLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const veryfyRefreshToken = async () => {
      try {
        // the auth will be added with a new accessToken
        await getUser();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setLoading(false);
        setLoading(false);
      }
    };

    !auth?.name ? veryfyRefreshToken() : setLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
