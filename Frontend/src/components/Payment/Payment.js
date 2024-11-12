import React, { useState } from "react";
import PaymethodButton from "../Button/PaymethodButton";
import GobackButton from "../Button/GobackButton";

const Payment = ({ cartItems, calculateGrandTotal, onGoBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="bg-white shadow-lg z-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Payment Options</h2>

      <h3 className="text-lg font-semibold mb-4 text-black">Order Summary:</h3>
      <ul className="mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="mb-2 text-black">
            {item.title} - {item.quantity} x ${item.price} = $
            {item.quantity * item.price}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-6 text-black">
        Grand Total: ${calculateGrandTotal()}
      </h3>

      <h3 className="text-lg font-semibold mb-4 text-black">
        Choose Payment Method:
      </h3>
      <div className="flex flex-col gap-2 mb-6">
        <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => handlePaymentMethodChange("cash")}
          />{" "}
          <span className="ml-2 text-black">Cash</span>
        </label>
        <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
          <input
            type="radio"
            name="payment"
            value="bankTransfer"
            checked={paymentMethod === "bankTransfer"}
            onChange={() => handlePaymentMethodChange("bankTransfer")}
          />{" "}
          <span className="ml-2 text-black">Bank</span>
        </label>
        <label className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
          <input
            type="radio"
            name="payment"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={() => handlePaymentMethodChange("creditCard")}
          />{" "}
          <span className="ml-2 text-black">Credit Card</span>
        </label>
      </div>

      {paymentMethod === "bankTransfer" && (
        <div className="mb-4 text-black">
          <p className="font-medium">Bank Transfer Instructions:</p>
          <p>Bank Name: TP Bank</p>
          <p>Account Number: 123456789</p>
          <p>Account Name: Koala Restaurant</p>
        </div>
      )}

      {paymentMethod === "creditCard" && (
        <div className="mb-4">
          <label className="block text-black">Card Number:</label>
          <input
            type="text"
            className="text-black shadow-lg focus:border-2 border-gray-300 px-3 py-2 rounded-xl w-56 transition-all focus:w-64 outline-none"
          />
          <label className="block text-black mt-4">Expiration Date:</label>
          <input
            type="text"
            className="text-black shadow-lg focus:border-2 border-gray-300 px-3 py-2 rounded-xl w-56 transition-all focus:w-64 outline-none"
          />
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onGoBack}>
          <GobackButton />
        </button>
        <button>
          <PaymethodButton />
        </button>
      </div>
    </div>
  );
};

export default Payment;
