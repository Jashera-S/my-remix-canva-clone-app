import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import * as fabric from 'fabric';

export interface CanvasHandle {
  addTextToCanvas: (text: string, options: { fontSize?: number; fill?: string }) => void;
  addImageToCanvas: (imageUrl: string) => void;
  undo: () => void;
  redo: () => void;
  setTextAlignment: (alignment: 'left' | 'center' | 'right') => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  setFontFamily: (font: string) => void;
  addShapeToCanvas: (shape: string, color: string, size: number) => void; // New method for adding shapes
}

const Canvas = forwardRef<CanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstance = useRef<fabric.Canvas | null>(null);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  useImperativeHandle(ref, () => ({
    addTextToCanvas,
    addImageToCanvas,
    undo,
    redo,
    setTextAlignment,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    setFontFamily,
    addShapeToCanvas, // Expose the new method
  }));

  const addTextToCanvas = (text: string, options: { fontSize?: number; fill?: string }) => {
    if (!text) {
      console.error('No text provided for the text box');
      return;
    }

    saveState(); // Save the current state for undo/redo

    const textBox = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      width: 200,
      height: 100,
      fontSize: options.fontSize || 18,
      fill: options.fill || '#000',
      textAlign: 'left',
      editable: true,
      padding: 10,
      borderColor: '#3498db',
      cornerColor: '#3498db',
      cornerStrokeColor: '#3498db',
      transparentCorners: false,
      strokeWidth: 2,
      cornerStyle: 'circle',
      hasBorders: true,
      hasControls: true,
    });

    textBox.setControlsVisibility({
      tl: true,
      tr: true,
      bl: true,
      br: true,
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      mtr: false,
    });

    if (canvasInstance.current) {
      canvasInstance.current.add(textBox);
      canvasInstance.current.setActiveObject(textBox);
      canvasInstance.current.renderAll();
    } else {
      console.error('Canvas instance not available');
    }
  };

  const addImageToCanvas = (imageUrl: string) => {
    if (!canvasInstance.current) return;

    fabric.Image.fromURL(imageUrl, (img: fabric.Image) => {
        img.set({
            left: 100, // Position of the image on the canvas
            top: 100,
            selectable: true,
            editable: true,
      padding: 10,
      borderColor: '#3498db',
      cornerColor: '#3498db',
      cornerStrokeColor: '#3498db',
      transparentCorners: false,
      strokeWidth: 2,
      cornerStyle: 'circle',
      hasBorders: true,
      hasControls: true,
        });
        saveState(); // Save the current state for undo/redo
        canvasInstance.current?.add(img);
        canvasInstance.current?.renderAll();
        console.log("Image added to canvas:", img); // Debug log
    }, {
        crossOrigin: 'anonymous', // Ensure CORS is handled
    }).then((img) => {
        if (canvasInstance.current) {
            canvasInstance.current.add(img);
            canvasInstance.current.renderAll();
        }
    }).catch((err) => {
        console.error('Error loading image:', err); // Error handling
    });
};


  const addShapeToCanvas = (shape: string, color: string, size: number) => {
    if (!canvasInstance.current) return;

    console.log(`Adding shape: ${shape}, Color: ${color}, Size: ${size}`);
    saveState(); // Save the current state for undo/redo

    let shapeObject: fabric.Object | null = null;

    switch (shape.toLowerCase()) {
      case 'rectangle':
        shapeObject = new fabric.Rect({
          width: size,
          height: size,
          fill: color,
          left: 50,
          top: 50,
        });
        break;
      case 'circle':
        shapeObject = new fabric.Circle({
          radius: size / 2,
          fill: color,
          left: 50,
          top: 50,
        });
        break;
      case 'triangle':
        shapeObject = new fabric.Triangle({
          width: size,
          height: size,
          fill: color,
          left: 50,
          top: 50,
        });
        break;
      case 'oval':
        shapeObject = new fabric.Ellipse({
          rx: size * 1.5 / 2,
          ry: size / 2,
          fill: color,
          left: 50,
          top: 50,
        });
        break;
      default:
        console.error('Unknown shape type:', shape);
        return;
    }

    if (shapeObject) {
      canvasInstance.current.add(shapeObject);
      canvasInstance.current.setActiveObject(shapeObject);
      canvasInstance.current.renderAll();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
      selection: true,
    });

    const resizeCanvas = () => {
      if (canvasInstance.current) {
        canvasInstance.current.setDimensions({
          width: window.innerWidth - 350,
          height: 450,
        });
        canvasInstance.current.renderAll();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    canvasInstance.current.on('selection:created', (e: fabric.IEvent) => {
      const target = e.target;
      if (target) {
        setActiveObject(target);
      }
    });

    canvasInstance.current.on('selection:cleared', () => {
      setActiveObject(null);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvasInstance.current?.dispose();
    };
  }, []);

  const saveState = () => {
    const state = JSON.stringify(canvasInstance.current?.toJSON());
    undoStack.current.push(state);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length > 0) {
      const state = undoStack.current.pop();
      if (state) {
        redoStack.current.push(JSON.stringify(canvasInstance.current?.toJSON()));
        canvasInstance.current?.loadFromJSON(state, () => {
          canvasInstance.current?.renderAll();
        });
      }
    }
  };

  const redo = () => {
    if (redoStack.current.length > 0) {
      const state = redoStack.current.pop();
      if (state) {
        undoStack.current.push(JSON.stringify(canvasInstance.current?.toJSON()));
        canvasInstance.current?.loadFromJSON(state, () => {
          canvasInstance.current?.renderAll();
        });
      }
    }
  };

  const setTextAlignment = (alignment: 'left' | 'center' | 'right') => {
    const activeObject = canvasInstance.current?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      (activeObject as fabric.Textbox).set({ textAlign: alignment });
      canvasInstance.current?.renderAll();
    }
  };

  const toggleBold = () => {
    const activeObject = canvasInstance.current?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      const currentFontWeight = (activeObject as fabric.Textbox).fontWeight === 'bold' ? 'normal' : 'bold';
      (activeObject as fabric.Textbox).set({ fontWeight: currentFontWeight });
      canvasInstance.current?.renderAll();
    }
  };

  const toggleItalic = () => {
    const activeObject = canvasInstance.current?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      const currentFontStyle = (activeObject as fabric.Textbox).fontStyle === 'italic' ? 'normal' : 'italic';
      (activeObject as fabric.Textbox).set({ fontStyle: currentFontStyle });
      canvasInstance.current?.renderAll();
    }
  };
 
  const toggleUnderline = () => {
    const activeObject = canvasInstance.current?.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      const textbox = activeObject as fabric.Textbox;
  
      // Check current text decoration and toggle it
      const currentDecoration = textbox.textDecoration === 'underline' ? '' : 'underline';
  
      // Update the text decoration
      textbox.set({ textDecoration: currentDecoration });
      canvasInstance.current?.renderAll();
    }
  };
  
  

  const setFontFamily = (font: string) => {
    const activeObject = canvasInstance.current?.getActiveObject();
    console.log("Active Object:", activeObject); // Log active object for debugging
    if (activeObject && activeObject.type === 'textbox') {
      (activeObject as fabric.Textbox).set({ fontFamily: font });
      canvasInstance.current?.renderAll();
      console.log(`Font changed to: ${font}`); // Confirm the font change
    } else {
      console.warn('Selected object is not a textbox:', activeObject);
    }
  };
  

  return (
    <div className="relative flex justify-start">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 shadow-md"
        style={{ marginLeft: '290px', marginTop: '50px' }}
      />
    </div>
  );
});

export default Canvas;
