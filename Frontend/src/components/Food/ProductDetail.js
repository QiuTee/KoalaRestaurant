import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { menuItems } from "../../data/MenuData";
import Rating from './Rating';
import OrderButton from "../Button/OrderButton";
import Button from '../Button/Button';
import Accordion from '../../components/ui/Accordion';

const ProductDetail = () => {
    const { id } = useParams();
    const product = menuItems.find(item => item.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <h1>Cannot find product.</h1>;
    }

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className="container mx-auto p-5">

            <div className="flex items-start pl-20">

                <div className="w-1/3 pr-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-1/2">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <Rating rating={product.rating} />
                    <p className="mt-4">{product.description}</p>
                    <h2 className="text-2xl font-semibold text-green-600">Price: {product.price}$</h2>

                    <div className="mt-4 flex items-center">
                        <Button
                            title="-"
                            onClick={handleDecreaseQuantity}
                            className="px-4 py-2 text-lg rounded-l"
                        />
                        <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-16 text-center border-y p-2"
                        />
                        <Button
                            title="+"
                            onClick={handleIncreaseQuantity}
                            className="px-4 py-2 text-lg rounded-r"
                        />
                    </div>

                    <div className="mt-6">
                        <OrderButton product={product} quantity={quantity} buttonTitle={`Add to Cart - $${(product.price * quantity).toFixed(2)}`} />
                    </div>

                    <div className="mt-6">
                        <Accordion title="Product Details">
                            <ul>
                                <li>Premium grade salmon</li>
                                <li>Served with fresh wasabi</li>
                                <li>Includes soy sauce and ginger</li>
                                <li>5 pieces per serving</li>
                            </ul>
                        </Accordion>

                        <Accordion title="Nutritional Information">
                        </Accordion>

                        <Accordion title="Serving Suggestions">
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
