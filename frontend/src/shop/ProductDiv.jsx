import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "../axiosApi/axios";
import useAuth from "../hooks/useAuth";

const ProductDiv = () => {
  const [items, setItems] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedItem, setSearchItem] = useState("");
  // const { setLoading } = useAuth();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/queryProducts?categoryName=${selectedCategory}&q=${searchedItem}`
        );
        console.log("query prd ", data);
        setItems(data?.prds);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllProducts();
    setLoading(false);
  }, [selectedCategory, searchedItem]);

  const filterItems = (categItem) => {
    setSelectedCategory(categItem);
  };

  const searchFilter = (e) => {
    const itemSearch = e.target.value.toLowerCase();
    setSearchItem(itemSearch);
  };

  return (
    <div className="wrapper-div">
      {loading ? (
        <div>
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="" />
          </div>
        </div>
      ) : (
        <div id="Product-div">
          <h1>Our Product</h1>
          <div className="dash"></div>
          <div className="product-filter-search">
            <div className="product-filter-btn">
              <a
                href="#"
                onClick={() => filterItems("all")}
                className="filter-btn"
              >
                All
              </a>
              <a
                href="#"
                onClick={() => filterItems("Chair")}
                className="filter-btn"
              >
                Chair
              </a>
              <a
                href="#"
                onClick={() => filterItems("Cushion")}
                className="filter-btn"
              >
                Cushion
              </a>
              <a
                href="#"
                onClick={() => filterItems("Table")}
                className="filter-btn"
              >
                Table
              </a>
              <a
                href="#"
                onClick={() => filterItems("Bed")}
                className="filter-btn"
              >
                Bed
              </a>
            </div>
            <div className="searchBox">
              <input
                type="search"
                id="searchField"
                placeholder="search items"
                onChange={searchFilter}
              />
            </div>
          </div>

          {/* products */}
          <Products items={items} />
        </div>
      )}
    </div>
  );
};

export default ProductDiv;
