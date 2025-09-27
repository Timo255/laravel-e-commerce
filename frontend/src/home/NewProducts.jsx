import React, { useEffect, useState } from "react";
// import axios from "../axiosApi/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import Offer from "./Offer";
import useAuth from "../hooks/useAuth";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState();
  const { setLoading } = useAuth();

useEffect(() => {
  const getNewProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIURL}/api/newProducts`
      );
      setNewProducts(data?.prds);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // always stop loading after request finishes
    }
  };

  getNewProducts();
}, []);

  
  return (
    <div className="wrapper-div">
      <div id="Product-div">
        <h1>New Product</h1>
        <div className="dash"></div>
        <div className="product-img-div">
          {newProducts &&
            newProducts.map((newProduct) => (
              <div className="product-img-details" key={newProduct.uuid}>
                <div className="img-product">
                  <Link
                    to={`/shop/${newProduct.uuid}`}
                    onClick={() => window.scroll(0, 0)}
                  >
                    <img
                      src={`${import.meta.env.VITE_APIURL}/images/${
                        newProduct.img
                      }`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="product-details">
                  <div className="name-price">
                    <p className="product-name">{newProduct.nameShop}</p>
                    <p className="price">${newProduct.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* offer */}
      <Offer />
    </div>
  );
};

export default NewProducts;
