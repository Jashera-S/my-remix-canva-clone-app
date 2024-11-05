import React from 'react';

interface NavbarProps {
  onUndo: () => void;
  onRedo: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onUndo, onRedo }) => {
  return (
    <div className="fixed top-0 left-0 bg-gradient-to-r from-[#00C4CC] to-[#A3D9D9] text-white w-full flex items-center justify-between p-4 z-10">
      <div>
        <img
          src="/Canvalogo.png"
          alt="Canva Logo"
          className="h-8"
        />
      </div>

      <div className="flex-grow text-center">
        <span className="text-xl font-bold">Untitled Design</span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="bg-[#00C4CC] text-white p-2 rounded transition duration-300 hover:bg-[#00A2A7] flex items-center"
          onClick={onUndo}
          title="Undo"
        >
          <i className="fas fa-undo"></i>
        </button>

        <button
          className="bg-[#00C4CC] text-white p-2 rounded transition duration-300 hover:bg-[#00A2A7] flex items-center"
          onClick={onRedo}
          title="Redo"
        >
          <i className="fas fa-redo"></i>
        </button>

        <button
          className="bg-[#00C4CC] text-white p-2 rounded transition duration-300 hover:bg-[#00A2A7] flex items-center"
          title="Export"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1"
          >
            <path d="M12 2l4 4h-3v7h-2V6H8l4-4zm8 8v10H4V10h2v8h12v-8h2z" fill="currentColor" />
          </svg>
          Export
        </button>
      </div>
    </div>
  );
};

export default Navbar;
