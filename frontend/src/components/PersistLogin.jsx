import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const { auth, getUser, isLoading, setLoading } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token && !auth?.name) {
          await getUser();
        }
      } catch (err) {
        console.error("PersistLogin error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [auth?.name, getUser, setLoading]);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="Loading..." />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
