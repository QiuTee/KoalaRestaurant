import React from "react";

const ImageUploader = ({ onImageChange, previewImage }) => (
  <>
    <input
      type="file"
      name="image"
      onChange={onImageChange}
      className="border p-2 rounded mb-4 w-full"
      accept="image/*"
    />
    {previewImage && (
      <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded mb-4" />
    )}
  </>
);

export default ImageUploader;
