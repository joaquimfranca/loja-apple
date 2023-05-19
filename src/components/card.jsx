import { useContext } from "react";
import { CartContext } from "../Context/context";
import "../../src/styles/card.css";
import React, { useState, useEffect } from "react";
import productData from "../data/products.json"


export default function Card() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const handleAddToBag = (product) => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      setCartItems([...cartItems, product]);
    }
  };

  useEffect(() => {
    setProducts(productData);
  }, []);

  return (
    <>
      <div className="container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="product-title">
              <h1>{product.title}</h1>
            </div>
            <div className="product-image">
            <img src={`https://raw.githubusercontent.com/joaquimfranca/img-repository/master/images/${product.imgname}`} />

            </div>
           
            <div className="product-description">
              <h2>{product.description}</h2>
              <h3>${product.price},00</h3>
            </div>
            <div className="button">
              <button
                onClick={() => {
                  handleAddToBag(product);
                }}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
