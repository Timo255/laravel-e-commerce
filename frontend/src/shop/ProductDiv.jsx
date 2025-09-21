import React, { useEffect, useState, useRef } from "react";
import Products from "./Products";
import axios from "../axiosApi/axios";

const ProductDiv = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchedItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);

  const firstLoad = useRef(true); // ✅ track only first load

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        if (firstLoad.current) {
          setLoading(true); // show loader only on first load
        }

        const { data } = await axios.get(
          `/api/queryProducts?categoryName=${selectedCategory}&q=${searchedItem}`
        );
        setItems(data?.prds || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        if (firstLoad.current) {
          setLoading(false);
          firstLoad.current = false; // stop loader after first load
        }
      }
    };

    getAllProducts();
  }, [selectedCategory, searchedItem]);

  // ✅ Handle category clicks
  const filterItems = (categItem) => {
    setSelectedCategory(categItem);
    setSearchItem(""); // clear search when selecting category
  };

  // ✅ Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    setSelectedCategory("all"); // 🔑 always reset to "all" when searching
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
              value={searchedItem}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* ✅ Only show spinner on first page load */}
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
