import React from "react";
import OrderCard from "../components/Order/OrderCard";

const Order = () => {
  return (
    <div>
      <div className="mt-8 flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor pb-12">
        <h1 className="font-semibold text-center text-4xl mb-8">Our Food</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-12 justify-end">
          <OrderCard img="/images/menu1.jpg" title="Dish 1" price={10} />
          <OrderCard img="/images/menu2.jpg" title="Dish 2" price={11} />
          <OrderCard img="/images/menu3.jpg" title="Dish 3" price={12} />
          <OrderCard img="/images/menu4.jpg" title="Dish 4" price={13} />
          <OrderCard img="/images/menu1.jpg" title="Dish 5" price={14} />
          <OrderCard img="/images/menu2.jpg" title="Dish 6" price={15} />
          <OrderCard img="/images/menu3.jpg" title="Dish 7" price={16} />
          <OrderCard img="/images/menu4.jpg" title="Dish 8" price={17} />
          <OrderCard img="/images/menu1.jpg" title="Dish 9" price={18} />
          <OrderCard img="/images/menu2.jpg" title="Dish 10" price={19} />
          <OrderCard img="/images/menu3.jpg" title="Dish 11" price={20} />
          <OrderCard img="/images/menu4.jpg" title="Dish 12" price={21} />
        </div>
      </div>
    </div>
  );
};

export default Order;
