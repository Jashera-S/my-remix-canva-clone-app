import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

interface TextOptions {
  fontSize: number;
  fill: string;
}

interface TextToolPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddText: (text: string, options: TextOptions) => void;
}

const TextToolPanel: React.FC<TextToolPanelProps> = ({
  isOpen,
  onClose,
  onAddText,
}) => {
  const [fontSize, setFontSize] = useState<number>(16); // Default font size
  const [color, setColor] = useState<string>('#000000'); // Default color

  // Handler for adding the text area to the canvas
  const addTextAreaToCanvas = () => {
    const text = "Add Text"; // Placeholder text
    // Pass the text and options to the parent component
    onAddText(text, { fontSize, fill: color });
    // Optionally reset the font size and color after adding
    setFontSize(16); 
    setColor('#000000'); 
  };

  if (!isOpen) return null; // Render nothing if the panel is closed

  return (
    <div className="fixed top-16 left-24 h-[calc(100vh-80px)] bg-white pt-8 mt-10 shadow-lg w-80 transition-transform duration-300 ease-in-out z-20 overflow-y-auto">
      <button onClick={onClose} className="absolute right-2 top-4 p-2">
        <IoIosArrowBack size={24} />
      </button>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Text Editing</h2>

        {/* Color Picker */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Text Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 border rounded"
          />
        </div>

        {/* Font Size Input */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-10 border rounded px-2"
          />
        </div>

        {/* Button to Add Text Area */}
        <button onClick={addTextAreaToCanvas} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Text Area
        </button>
      </div>
    </div>
  );
};

export default TextToolPanel;  
