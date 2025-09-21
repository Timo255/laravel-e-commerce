import React, { useEffect, useState, useRef } from "react";
import Products from "./Products";
import axios from "../axiosApi/axios";

const ProductDiv = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchedItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);

  const firstLoad = useRef(true); // ✅ track first load only

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        // Show loading ONLY on first load
        if (firstLoad.current) {
          setLoading(true);
        }

        const { data } = await axios.get(
          `/api/queryProducts?categoryName=${selectedCategory}&q=${searchedItem}`
        );
        setItems(data?.prds || []);
      } catch (error) {
        console.log(error);
      } finally {
        if (firstLoad.current) {
          setLoading(false);
          firstLoad.current = false; // ✅ mark as loaded
        }
      }
    };

    getAllProducts();
  }, [selectedCategory, searchedItem]);

  const filterItems = (categItem) => {
    setSelectedCategory(categItem);
  };

  return (
    <div className="wrapper-div">
      <div id="Product-div">
        <h1>Our Product</h1>
        <div className="dash"></div>

        {/* Search + filter controls */}
        <div className="product-filter-search">
          <div className="product-filter-btn">
            {["all", "Chair", "Cushion", "Table", "Bed"].map((c) => (
              <a
                href="#"
                key={c}
                onClick={(e) => {
                  e.preventDefault();
                  filterItems(c);
                }}
                className="filter-btn"
              >
                {c}
              </a>
            ))}
          </div>
          <div className="searchBox">
            <input
              type="search"
              id="searchField"
              placeholder="search items"
              onChange={(e) => setSearchItem(e.target.value.toLowerCase())}
            />
          </div>
        </div>

        {/* ✅ Only show loading on first page load */}
        {loading ? (
          <div className="loading-container">
            <div className="loading">
              <img src="/Rolling@1x-1.0s-200px-200px.svg" alt="Loading..." />
            </div>
          </div>
        ) : (
          <Products items={items} />
        )}
      </div>
    </div>
  );
};

export default ProductDiv;
