import React, { useState } from 'react';
import TemplatesPanel from './TemplatesToolPanel';
import TextPanel from './TextToolPanel';
import ShapesPanel from './ShapesToolPanel';
import ImagesPanel from './ImageToolPanel';
import UploadPanel from './UploadToolPanel';

interface SidebarProps {
  onAddText: (text: string, options: any) => void;
  onTextToolClick: () => void;
  onImagesToolClick: () => void; 
  onUploadToolClick: () => void;
  onShapesToolClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddText,
  onTextToolClick,
  onImagesToolClick,
  onUploadToolClick,
  onShapesToolClick,
}) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handlePanelClick = (panel: string) => {
    setActivePanel((prevPanel) => (prevPanel === panel ? null : panel));
  };

  const handleClose = () => {
    setActivePanel(null);
  };

  return (
    <aside className="flex fixed flex-col bg-gray-200 p-4 pt-10 w-24 h-full mt-8">
      <button
        className="flex flex-col items-center mb-4 p-2 hover:bg-gray-300 rounded"
        onClick={() => handlePanelClick('templates')}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M25.333 4H6.667A2.667 2.667 0 0 0 4 6.667v18.666A2.667 2.667 0 0 0 6.667 28h18.666A2.667 2.667 0 0 0 28 25.333V6.667A2.667 2.667 0 0 0 25.333 4ZM6 6.667C6 6.298 6.298 6 6.667 6h10.666v20H6.667A.667.667 0 0 1 6 25.333V6.667Zm13.333 6.666V6h6c.369 0 .667.298.667.667v6.666h-6.667Zm0 2V26h6a.667.667 0 0 0 .667-.667v-10h-6.667Z" fill="currentColor"></path>
        </svg>
        <span className="text-center">Template</span>
      </button>

      <button
        className="flex flex-col items-center mb-4 p-2 hover:bg-gray-300 rounded"
        onClick={() => {
          handlePanelClick('text');
          onTextToolClick();
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillRule="evenodd" d="M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z"></path>
        </svg>
        <span className="text-center">Text</span>
      </button>

      <button
        className="flex flex-col items-center mb-4 p-2 hover:bg-gray-300 rounded"
        onClick={() => {
          handlePanelClick('images');
          onImagesToolClick();
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M25.334 4H6.666A2.667 2.667 0 0 0 4 6.666v18.668A2.67 2.67 0 0 0 6.666 28h18.668A2.667 2.667 0 0 0 28 25.334V6.666A2.667 2.667 0 0 0 25.334 4ZM6.666 26h9.994l-4.878-6.608a.666.666 0 0 0-1.074.004L6.116 25.71c.12.174.32.29.55.29Zm18.668 0a.668.668 0 0 0 .666-.666v-3.63l-4.914-6.588a.666.666 0 0 0-1.072.004l-4.44 6.04 3.57 4.84h6.19Zm-2.646-12.08L26 18.36V6.666A.666.666 0 0 0 25.334 6H6.666A.666.666 0 0 0 6 6.666v15.802l3.09-4.248a2.666 2.666 0 0 1 4.302-.014l.938 1.27 4.07-5.54a2.666 2.666 0 0 1 4.288-.016ZM9.334 11.334a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" fill="currentColor"></path>
        </svg>
        <span className="text-center">Image</span>
      </button>

      <button
        className="flex flex-col items-center mb-4 p-2 hover:bg-gray-300 rounded"
        onClick={() => {
          handlePanelClick('shapes');
          onShapesToolClick();
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" d="m6.5 4.25.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6 4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
        </svg>
        <span className="text-center">Shape</span>
      </button>

      <button
        className="flex flex-col items-center mb-4 p-2 hover:bg-gray-300 rounded"
        onClick={() => {
          handlePanelClick('upload');
          onUploadToolClick();
        }}
      >
        <svg width="28" height="28" viewBox="0 0 42.621 42.621" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="currentColor" d="M0,7.698v31.978c0,3.25,2.538,5.788,5.788,5.788h30.065c3.25,0,5.788-2.538,5.788-5.788V7.698 c0-3.25-2.538-5.788-5.788-5.788H5.788C2.538,1.91,0,4.348,0,7.698L0,7.698z"></path>
            <path fill="currentColor" d="M15.675,21.591c-1.438,0-2.605,1.167-2.605,2.605v6.077c0,1.438,1.167,2.605,2.605,2.605h10.271c1.438,0,2.605-1.167,2.605-2.605v-6.077c0-1.438-1.167-2.605-2.605-2.605H15.675z"></path>
            <path fill="currentColor" d="M20.475,24.696v-5.813c0-1.438,1.167-2.605,2.605-2.605s2.605,1.167,2.605,2.605v5.813H20.475z"></path>
          </g>
        </svg>
        <span className="text-center">Upload</span>
      </button>

      {activePanel === 'templates' && <TemplatesPanel onClose={handleClose} />}
      {activePanel === 'text' && <TextPanel onAddText={onAddText} onClose={handleClose} />}
      {activePanel === 'images' && <ImagesPanel onClose={handleClose} />}
      {activePanel === 'shapes' && <ShapesPanel onClose={handleClose} />}
      {activePanel === 'upload' && <UploadPanel onClose={handleClose} />}
    </aside>
  );
};

export default Sidebar;
