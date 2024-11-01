import React from 'react';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';

const App: React.FC = () => {
  const handleAddText = (text: string, options: any) => {
    // Implement functionality for adding text to the canvas
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Canvas onAddText={handleAddText} />
      </div>
    </div>
  );
};

export default App;
