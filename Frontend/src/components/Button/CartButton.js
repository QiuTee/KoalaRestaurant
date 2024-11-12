import React from "react";
import { FaCartPlus } from "react-icons/fa";

const CartButton = () => {
  return (
    <button className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-orange-500 bg-orange-500 group hover:bg-orange-500 active:bg-orange-500 active:border-orange-500">
      <span className="text-gray-100 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
        Add Item
      </span>
      <span className="absolute right-0 h-full w-10 rounded-lg bg-orange-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
        <FaCartPlus className="text-gray-100" />
      </span>
    </button>
  );
};

export default CartButton;
