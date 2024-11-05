import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface ShapesToolPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateShape: (shape: string, color: string, size: number) => void;
}

const ShapesToolPanel: React.FC<ShapesToolPanelProps> = ({ isOpen, onClose, onCreateShape }) => {
  const [selectedShape, setSelectedShape] = useState<string>('rectangle');
  const [shapeColor, setShapeColor] = useState<string>('#000000');
  const [shapeSize, setShapeSize] = useState<number>(50);

  if (!isOpen) return null;

  const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShape(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShapeColor(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShapeSize(Number(event.target.value));
  };

  const renderShapePreview = () => {
    const shapeStyles = {
      backgroundColor: shapeColor,
      width: `${shapeSize}px`,
      height: `${shapeSize}px`,
    };

    switch (selectedShape) {
      case 'rectangle':
        return <div className="border border-gray-400" style={shapeStyles} />;
      case 'circle':
        return <div className="rounded-full border border-gray-400" style={shapeStyles} />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shapeSize}px solid transparent`,
              borderRight: `${shapeSize}px solid transparent`,
              borderBottom: `${shapeSize}px solid ${shapeColor}`,
            }}
          />
        );
      case 'oval':
        return <div className="rounded-full border border-gray-400" style={{ ...shapeStyles, borderRadius: '50%', width: `${shapeSize * 1.5}px` }} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-16 left-24 h-[calc(100vh-80px)] bg-white mt-5 pt-8 shadow-lg w-80 transition-transform duration-300 ease-in-out z-20 overflow-y-auto">
      <button onClick={onClose} className="absolute right-2 mt-6 top-4 p-2 text-gray-600 hover:text-gray-900 transition">
        <IoIosArrowBack size={24} />
      </button>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Shapes Options</h3>

        <label className="block mb-2">Shape</label>
        <select className="border rounded mb-4 w-full" value={selectedShape} onChange={handleShapeChange}>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
          <option value="oval">Oval</option>
        </select>

        <label className="block mb-2">Color</label>
        <input
          type="color"
          value={shapeColor}
          onChange={handleColorChange}
          className="border rounded mb-4 w-full"
        />

        <label className="block mb-2">Size</label>
        <input
          type="range"
          min="10"
          max="200"
          value={shapeSize}
          onChange={handleSizeChange}
          className="w-full mb-4"
        />
        <span>{shapeSize}px</span>

        <h4 className="text-lg font-semibold mt-4">Preview:</h4>
        <div className="flex justify-center items-center mb-4">{renderShapePreview()}</div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => {
            onCreateShape(selectedShape, shapeColor, shapeSize);
            onClose();
          }}
        >
          Add Shape
        </button>
      </div>
    </div>
  );
};

export default ShapesToolPanel;
