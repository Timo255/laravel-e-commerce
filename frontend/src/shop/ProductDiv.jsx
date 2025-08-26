import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "../axiosApi/axios";
import useAuth from "../hooks/useAuth";

const ProductDiv = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false); // Initialize as false

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await axios.get(
          `/api/queryProducts?categoryName=${selectedCategory}&q=${searchedItem}`
        );
        console.log("query prd ", data);
        setItems(data?.prds || []); // Fallback to empty array if prds is undefined
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Always stop loading, whether success or error
      }
    };

    getAllProducts();
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
        <div className="loading-container">
          <div className="loading">
            <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="Loading..." />
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
                onClick={(e) => {
                  e.preventDefault();
                  filterItems("all");
                }}
                className="filter-btn"
              >
                All
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filterItems("Chair");
                }}
                className="filter-btn"
              >
                Chair
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filterItems("Cushion");
                }}
                className="filter-btn"
              >
                Cushion
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filterItems("Table");
                }}
                className="filter-btn"
              >
                Table
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filterItems("Bed");
                }}
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
