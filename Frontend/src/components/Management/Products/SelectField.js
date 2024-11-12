import React from "react";

const SelectField = ({ name, value, onChange, options }) => (
  <select name={name} value={value} onChange={onChange} className="border p-2 rounded mb-4 w-full">
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectField;
