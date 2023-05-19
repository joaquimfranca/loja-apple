import { useContext } from "react";
import { CartContext } from "../Context/context";
import "../styles/bag.css";
import { useState, useRef, useEffect } from "react";
import bagicon from "../data/images/bag.png";

export default function Bag() {
const [open, setOpen] = useState(false);
const ref = useRef(null);
const { cartItems, setCartItems } = useContext(CartContext);

const handleClickOutside = (event) => {
if (ref.current && !ref.current.contains(event.target)) {
setOpen(false);
}
};
useEffect(() => {
document.addEventListener("mousedown", handleClickOutside);
}, []);

const handleRemoveFromBag = (product) => {
  const updatedCart = cartItems.filter((item) => item.id !== product.id);
  setCartItems(updatedCart);
};

const handlePlusBag = (product) => {
  const updatedCart = cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: Number(item.quantity) + 1 } : item
  );
  setCartItems(updatedCart);
};

const handleMinusBag = (product) => {
  const updatedCart = cartItems.map((item) => {
    if (item.id === product.id) {
      const newQuantity = Number(item.quantity) - 1;
      if (newQuantity <= 0) {
        return null;
      }
      return { ...item, quantity: newQuantity };
    }
    return item;
  }).filter(Boolean);
  setCartItems(updatedCart);
};

const calculateTotalCartPrice = () => {
const total = cartItems.reduce(
(accumulator, { price, quantity }) => accumulator + price * quantity,
0
);
return total;
};

const calculateTotalItems = () => {
  const totalitems = cartItems.reduce(
  (accumulator, { quantity }) => accumulator + quantity,
  0
  );
  return totalitems;
  };
  const totalItems = calculateTotalItems();

return (

  <div className="bag" ref={ref}>
    <span>{totalItems}</span>
  <button className="buttonbag" onClick={() => setOpen(!open) }>
    <img src={bagicon} />
  </button>
  <div className={`bag-container ${open && "show"}`}>
    <div className="bag-header">
      <h1>Bag</h1>
      <button className="close-button" onClick={() =>setOpen(false)}>
        
        Close 
      </button>
    </div>
    {cartItems && cartItems.length > 0 ? (
      <>
        {cartItems.map((item) => (
          
          <div className="bag-products" key={item.id}>
            <div className="bag-product-description">
              <h2>{item.title}</h2>
              <img src={`https://raw.githubusercontent.com/joaquimfranca/img-repository/master/images/${item.imgname}`} />
              <h4>Price: ${item.price},00</h4>
            </div>
            <div className="buttons">
              <div className="blue-buttons">
                
                <button className="add-buttons1" onClick={() => handleMinusBag(item)}>-</button>
                <p> {item.quantity}</p>
                <button className="add-buttons2" onClick={() => handlePlusBag(item)}>+</button>
              </div>
              <button className="remove" onClick={() => handleRemoveFromBag(item)}>
                Remove
              </button>
              <div className="subtotal">
                <p>Sub-Total: ${item.quantity * item.price},00</p>
              </div>
            </div>
          </div>
        ))}
        <div className="total">
          <p>Total: ${calculateTotalCartPrice()},00</p>
        </div>
      </>
    ) : (
      <div className="noitens">
        
        <p>No items in cart</p>
      </div>
    )}
  </div>
</div>

  );
}
