import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Products = ({ items }) => {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <div className="product-img-div">
          {items &&
            items?.map((item) => (
              <div
                className={`product-img-details ${item.category}`}
                key={item.uuid}
              >
                <div className="img-product">
                  <Link
                    to={`/shop/${item.uuid}`}
                    onClick={() => window.scroll(0, 0)}
                  >
                    <img
                      src={`${import.meta.env.VITE_APIURL}/images/${item.img}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="product-details">
                  <div className="name-price">
                    <p className="product-name" id="pn">
                      {item.nameShop}
                    </p>
                    <p className="price">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="product-img-div">
          {items &&
            items?.map((item) => (
              <div
                className={`product-img-details ${item.category}`}
                key={item.uuid}
              >
                <div className="img-product">
                  <Link
                    to={`/shop/${item.uuid}`}
                    onClick={() => window.scroll(0, 0)}
                  >
                    <img
                      src={`${import.meta.env.VITE_APIURL}/images/${item.img}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="product-details">
                  <div className="name-price">
                    <p className="product-name" id="pn">
                      {item.nameShop}
                    </p>
                    <p className="price">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Products;
