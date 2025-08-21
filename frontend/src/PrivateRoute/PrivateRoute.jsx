import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth, isLoading, setAuth, getUser,setLoading } = useAuth();
  const location = useLocation();

  console.log(auth);
  // useEffect(() => {
  //   const userGet = async () => {
  //     try {
  //       if (!auth?.name) {
  //         setLoading(true)
  //         await getUser();
  //         setLoading(false)
  //       }
  //     } catch (error) {
  //       const res = error.response;
  //       if (res && res.status === 401) {
  //         // console.log(res.data.errors);
  //         // setErrors(res.data.errors);
  //         setLoading(false);
  //       }
  //     }
  //   };
  //   userGet();
  // },[]);
  //  if(auth?.name){
  //       return children;
  //   }

  return (
    <>
      {/* {
        auth?.name && <Outlet />
      } */}
      {/* {
        auth?.name ? <Outlet /> : <Navigate to={"/login"} state={{ from: location }} replace />
      } */}

      {/* {isLoading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : auth ? (
        <Outlet /> ) : <Navigate to={"/login"} state={{ from: location }} replace />
       } */}

     {auth? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    

      {/* : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      ) */}
    </>
  );
};

export default PrivateRoute;
