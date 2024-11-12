import React from "react";

const FormField = ({ type, name, value, onChange, placeholder, min }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border p-2 rounded mb-4 w-full"
    min={min}
  />
);

export default FormField;
