import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface UploadToolPanelProps {
  isOpen: boolean;
  onClose: () => void;
  addImageToCanvas: (imageUrl: string) => void;
}

const UploadToolPanel: React.FC<UploadToolPanelProps> = ({
  isOpen,
  onClose,
  addImageToCanvas,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Exit early if the panel is not open
  if (!isOpen) return null;

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  // Add the uploaded image to the canvas
  const handleAddImage = () => {
    if (uploadedImage) {
      addImageToCanvas(uploadedImage);
      setUploadedImage(null); // Clear the preview
      setSelectedFile(null); // Clear the file input
      onClose(); // Close the panel after adding the image
    }
  };

  return (
    <div className="fixed top-16 left-24 h-[calc(100vh-80px)] bg-white mt-5 pt-8 shadow-lg w-80 transition-transform duration-300 ease-in-out z-20 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-2 mt-6 top-4 p-2 text-gray-600 hover:text-gray-900 transition"
      >
        <IoIosArrowBack size={24} />
      </button>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Upload Images</h2>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border mb-4 p-2 w-full"
        />

        {/* Drag and Drop Message */}
        <p className="text-gray-600 mb-4">Drag and drop your files here</p>

        {/* Preview Selected Image */}
        {uploadedImage && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Image</h3>
            <img
              src={uploadedImage}
              alt="Uploaded preview"
              className="w-50 h-30 border rounded mb-2"
            />
            <button
              onClick={handleAddImage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Image to Canvas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadToolPanel;
