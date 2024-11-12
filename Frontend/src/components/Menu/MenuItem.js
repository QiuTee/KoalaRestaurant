import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCheckSquare, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartButton from '../Button/CartButton';

const MenuItem = ({ item }) => {
    const { ref, inView } = useInView({ triggerOnce: false });

    return (
        <div
            ref={ref}
            className={`flex justify-between items-center py-3  border-b border-gray-200 transition-all duration-500 ease-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
            <span className="text-left w-1/4">{item.name}</span>
            <span className="text-center w-1/4 px-10">
                {item.status === "Available" ? (
                    <FaCheckSquare className="text-green-500" />
                ) : (
                    <FaTimesCircle className="text-red-500" />
                )}
            </span>
            <span className="text-center font-semibold w-1/4">{item.price}</span>

            <Link to={`/product/${item.id}`}>
                <CartButton/>
            </Link>

        </div>
    );
};

export default MenuItem;
