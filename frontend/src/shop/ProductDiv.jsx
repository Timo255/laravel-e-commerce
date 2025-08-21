import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "../axiosApi/axios";

const ProductDiv = () => {
  const [items, setItems] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchedItem, setSearchItem] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      const {data} = await axios.get(
        `/api/queryProducts?categoryName=${selectedCategory}&q=${searchedItem}`
      );
      console.log("query prd ", data);
      setItems(data?.prds);
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
    </div>
  );
};

export default ProductDiv;
