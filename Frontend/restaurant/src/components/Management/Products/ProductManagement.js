import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import AddEditProductDialog from './AddEditProductDialog';
import { menuItems } from "../../../data/MenuData";
import { SearchIcon } from 'lucide-react';

const ProductManagement = () => {
    const [products, setProducts] = useState(menuItems);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddEditClick = (product = null) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button
                    onClick={() => handleAddEditClick()}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex items-center"
                >
                    <Plus className="mr-1" /> Add Product
                </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-white border-b m-10vh mb-5">
                <div className="flex items-center">
                    <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="p-2 bg-gray-100 rounded-md focus:outline-none"
                    />
                </div>

            </div>
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="border p-2">Photo</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b">
                            <td className="border p-2 flex justify-center items-center">
                                <img
                                    src={product.image}
                                    alt={`${product.name}`}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.category}</td>
                            <td className="p-3">${product.price}</td>
                            <td className="p-3">{product.stock}</td>
                            <td className={`p-3 ${product.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                                {product.status}
                            </td>
                            <td className="p-3 flex gap-2">
                                <button onClick={() => handleAddEditClick(product)}>
                                    <Edit className="text-blue-600" />
                                </button>
                                <button onClick={() => handleDelete(product.id)}>
                                    <Trash className="text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDialogOpen && (
                <AddEditProductDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    product={editingProduct}
                    setProducts={setProducts}
                />
            )}
        </div>
    );
};

export default ProductManagement;
