import React from 'react';

interface ToolbarProps {
  onAlignLeft: () => void;
  onAlignCenter: () => void;
  onAlignRight: () => void;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onFontChange: (font: string) => void; 
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onBold,
  onItalic,
  onUnderline,
  onFontChange, // Destructure new prop
}) => {
  return (
    <div className="fixed top-16 left-24 bg-gradient-to-r from-purple-500 to-blue-500 p-2 flex justify-around w-[calc(100%-48px)] z-30">
      <button onClick={onAlignLeft} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Align Left">
        <i className="fas fa-align-left"></i>
      </button>
      <button onClick={onAlignCenter} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Align Center">
        <i className="fas fa-align-center"></i>
      </button>
      <button onClick={onAlignRight} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Align Right">
        <i className="fas fa-align-right"></i>
      </button>
      <button onClick={onBold} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Bold">
        <i className="fas fa-bold"></i>
      </button>
      <button onClick={onItalic} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Italic">
        <i className="fas fa-italic"></i>
      </button>
      <button onClick={onUnderline} className="text-white p-2 rounded hover:bg-opacity-75 transition" title="Underline">
        <i className="fas fa-underline"></i>
      </button>
      <select 
        onChange={(e) => onFontChange(e.target.value)}  
        className="text-white bg-transparent border border-white rounded p-1"
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Impact">Impact</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Lucida Console">Lucida Console</option>
        <option value="Palatino Linotype">Palatino Linotype</option>
        <option value="Garamond">Garamond</option>
      </select>
    </div>
  );
};

export default Toolbar;
