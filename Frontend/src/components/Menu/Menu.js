import MenuItem from "./MenuItem";
import { menuItems } from "../../data/MenuData";
import BackgroundSlider from "./BackgroundSlider";
import React, { useState } from "react";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const categories = [
    "All",
    "Sashimi",
    "Sushi",
    "Salad",
    "Wagyu",
    "Hotpot",
    "Beer",
    "Wine",
  ];

  return (
    <div className="max-w-4xl w-full mx-auto p-5 text-gray-800">
      <BackgroundSlider selectedCategory={selectedCategory} />

            <div className="flex justify-center mb-6 space-x-4 overflow-auto">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 text-sm font-medium rounded transition-all duration-300 ${selectedCategory === category
                            ? 'bg-yellow-600 text-white'
                            : 'bg-transparent text-gray-800 hover:bg-gray-200'
                            }`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-gray-300 font-bold text-lg text-gray-600">
                <span className="md:px-16 px-5 w-1/4">Dishes</span>
                <span className="md:px-36 w-1/4 px-20">Status</span>
                <span className="text-center w-1/4">Cost</span>
                <span className="md:px-4 w-1/4 sm:px-10">Quantity</span>
            </div>

            <div className="max-w-3xl w-full mx-auto p-5 text-gray-800">
                {filteredItems.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </div>


        </div>
    );
};

export default Menu;
