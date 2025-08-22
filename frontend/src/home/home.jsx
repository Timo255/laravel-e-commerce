import React from "react";
import Slider from "./Slider";
import NewProducts from "./NewProducts";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isLoading } = useAuth();
  return (
    <div>
      {isLoading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : (
        <>
          <Slider />
          <NewProducts />
        </>
      )}
    </div>
  );
};

export default Home;
