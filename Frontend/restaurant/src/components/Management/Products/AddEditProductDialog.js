import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import ImageUploader from "./ImageUploader";

const AddEditProductDialog = ({ isOpen, onClose, product, setProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Available",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setFormData(product || {
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Available",
      image: null,
    });
    setPreviewImage(product?.image || null);
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newProduct = product ? formData : { ...formData, id: Date.now() };
    setProducts((prev) =>
      product ? prev.map((p) => (p.id === product.id ? newProduct : p)) : [...prev, newProduct]
    );
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96 max-h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">
            {product ? "Edit Product" : "Add New Product"}
          </h2>

          <FormField type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
          <FormField type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
          <FormField type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
          <FormField type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" min={0} />
          
          <SelectField name="status" value={formData.status} onChange={handleChange} options={["Available", "Stock Out"]} />

          <ImageUploader onImageChange={handleImageChange} previewImage={previewImage} />

          <div className="flex justify-between">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
              {product ? "Update Product" : "Add Product"}
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEditProductDialog;
