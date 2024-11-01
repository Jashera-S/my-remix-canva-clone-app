import React, { useState, useRef, useCallback } from "react";
import { MetaFunction } from "@remix-run/node";
import CanvasArea, { CanvasHandle } from "~/components/Canvas";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import TextToolPanel from "~/components/TextToolPanel";
import ImagesToolPanel from "~/components/ImageToolPanel";
import UploadToolPanel from "~/components/UploadToolPanel";
import ShapesToolPanel from "~/components/ShapesToolPanel";
import Toolbar from "~/components/Toolbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Canvas Clone App" },
    { name: "description", content: "Canvas Drawing App with Fabric.js" },
  ];
};

export default function Index() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const canvasRef = useRef<CanvasHandle>(null);

  const handleAddText = useCallback((text: string, options: { fontSize: number; fill: string }) => {
    canvasRef.current?.addTextToCanvas(text, options);
  }, []);

  const handleAddImage = useCallback((imageUrl: string) => {
    canvasRef.current?.addImageToCanvas(imageUrl);
  }, []);

  const handleAddShape = useCallback((shapeType: string, color: string, size: number) => {
    canvasRef.current?.addShapeToCanvas(shapeType, color, size);
  }, []);

  const togglePanel = useCallback((panel: string) => {
    setActivePanel(prev => (prev === panel ? null : panel));
  }, []);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleAlignText = useCallback((alignment: "left" | "center" | "right") => {
    canvasRef.current?.alignText(alignment);
  }, []);

  // New handlers for text styling
  const handleBold = () => {
    canvasRef.current?.toggleBold();
  };

  const handleItalic = () => {
    canvasRef.current?.toggleItalic();
  };

  const handleUnderline = () => {
    canvasRef.current?.toggleUnderline();
  };

  const handleFontChange = (font: string) => {
    canvasRef.current?.changeFont(font);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onUndo={handleUndo} onRedo={handleRedo} />

      <div className="flex flex-grow">
        <Sidebar
          onAddText={handleAddText}
          onTextToolClick={() => togglePanel("text")}
          onImagesToolClick={() => togglePanel("images")}
          onUploadToolClick={() => togglePanel("upload")}
          onShapesToolClick={() => togglePanel("shapes")}
        />

        <div className="flex flex-col flex-grow">
          <Toolbar
            onAlignLeft={() => handleAlignText("left")}
            onAlignCenter={() => handleAlignText("center")}
            onAlignRight={() => handleAlignText("right")}
            onBold={handleBold}
            onItalic={handleItalic}
            onUnderline={handleUnderline}
            onFontChange={handleFontChange} // Font change handler
          />

          <div className="flex-grow flex justify-center items-center mt-5">
            <CanvasArea ref={canvasRef} />
          </div>

          {activePanel === "text" && (
            <TextToolPanel
              isOpen={true}
              onClose={() => togglePanel("text")}
              onAddText={handleAddText}
            />
          )}

          {activePanel === "images" && (
            <ImagesToolPanel
              isOpen={true}
              onClose={() => togglePanel("images")}
              addImageToCanvas={handleAddImage}
            />
          )}

          {activePanel === "upload" && (
            <UploadToolPanel
              isOpen={true}
              onClose={() => togglePanel("upload")}
              addImageToCanvas={handleAddImage}
            />
          )}

          {activePanel === "shapes" && (
            <ShapesToolPanel
              isOpen={true}
              onClose={() => togglePanel("shapes")}
              onCreateShape={handleAddShape}
            />
          )}
        </div>
      </div>
    </div>
  );
}
