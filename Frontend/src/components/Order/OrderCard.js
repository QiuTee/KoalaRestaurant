import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import CartButton from "../Button/CartButton";

const OrderCard = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(""); // State to handle notification message
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = {
      title: props.title,
      img: props.img,
      price: parseFloat(props.price), // Ensure the price is stored as a number
      quantity: quantity,
    };
    addToCart(product); // Add the product to the cart

    // Show success message
    setMessage("Added to cart successfully!");

    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 700);
  };

  // Increment and decrement quantity handlers
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full bg-gray-100 p-3 rounded-lg flex flex-col items-center">
      <div className="flex justify-center">
        <img className="rounded-lg" src={props.img} alt={props.title} />
      </div>
      <h2 className="text-black font-extrabold">{props.title}</h2>
      {/* Ensure price is displayed as currency */}
      <p className="text-black font-semibold">${props.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={decrementQuantity}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-black"
        >
          <FaMinus />
        </button>
        <span className="text-black">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-black"
        >
          <FaPlus />
        </button>
      </div>

      <div className="mt-2" onClick={handleAddToCart}>
        <CartButton />
      </div>

      {/* Success Message */}
      {message && (
        <div className="mt-3 text-green-500 font-semibold text-sm">
          {message}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
