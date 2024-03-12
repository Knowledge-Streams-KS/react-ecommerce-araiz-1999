import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filteredProducts with all products
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    if (searchQuery) {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortType) {
      case "priceAsc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "titleAsc":
        tempProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        tempProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(tempProducts);
  }, [searchQuery, sortType, products]);

  return (
    <div class="container">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="">Select Filter</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="titleAsc">Title: A to Z</option>
        <option value="titleDesc">Title: Z to A</option>
      </select>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              margin: 10,
              border: "1px solid #ddd",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <p>{product.description.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
