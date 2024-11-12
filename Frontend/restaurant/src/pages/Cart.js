import React, { useContext } from "react";
import { CartContext } from "../components/Order/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import CheckoutModal from "../components/Checkout/CheckoutModal";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Calculate the price for each item based on quantity
  const calculateTotalPrice = (item) => (item.price * item.quantity).toFixed(2);

  // Calculate the overall total price for all items in the cart
  const calculateGrandTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Increment the quantity of an item
  const incrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  // Decrement the quantity of an item, minimum quantity is 1
  const decrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>


      <div className="flex flex-col lg:flex-row gap-8 px-5 lg:px-20">

        <div className="flex-1">
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty</p>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start bg-gray-100 shadow-md rounded-lg p-5">

                  <div className="w-1/4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>


                  <div className="ml-5 flex flex-col justify-between w-2/3 space-y-4">
                    <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus className="text-black" />
                      </button>
                      <span className="font-semibold text-black">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus className="text-black" />
                      </button>
                    </div>

                    <p className="font-semibold text-lg text-black">
                      Total: ${calculateTotalPrice(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <CheckoutModal
            cartItems={cartItems}
            calculateTotalPrice={calculateTotalPrice}
            calculateGrandTotal={calculateGrandTotal}
            closeModal={() => { }}
            confirmPayment={() => alert("Payment confirmed!")}
            alwaysOpen={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
