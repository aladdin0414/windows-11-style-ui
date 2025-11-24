import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Trash2, Download, MousePointer2 } from 'lucide-react';

export const Paint: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  // Refs to access current state inside the ResizeObserver callback without dependencies
  const colorRef = useRef(color);
  const brushSizeRef = useRef(brushSize);
  const toolRef = useRef(tool);

  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { brushSizeRef.current = brushSize; }, [brushSize]);
  useEffect(() => { toolRef.current = tool; }, [tool]);
  
  // Basic colors palette
  const colors = [
    '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4',
    '#ffffff', '#c3c3c3', '#b97a57', '#ffaec9', '#ffc90e', '#efe4b0', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7'
  ];

  // Initialize Canvas & ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    
    contextRef.current = context;

    // Initial fill to avoid transparent background
    // We only do this if the canvas is blank (initial load)
    const data = context.getImageData(0, 0, 1, 1).data;
    if (data[3] === 0) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const updateCanvasSize = () => {
        if (!canvas || !context || !container) return;

        // 1. Save existing content to a temp canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0);
        }

        // 2. Resize canvas to match parent container exactly
        // We use Math.floor/ceil to ensure we cover the area, but clientWidth is usually integer.
        // Using rect allows us to get sub-pixel precision if needed, but for canvas width/height attributes, integers are best.
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // 3. Restore Context Settings (they get reset on resize)
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = toolRef.current === 'eraser' ? '#ffffff' : colorRef.current;
        context.lineWidth = brushSizeRef.current;

        // 4. Fill White Background (for the new empty areas)
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // 5. Restore Content
        // We draw the old image back. 
        if (tempCanvas.width > 0 && tempCanvas.height > 0) {
             context.drawImage(tempCanvas, 0, 0);
        }
    };

    const resizeObserver = new ResizeObserver(() => {
        // Wrap in requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
        window.requestAnimationFrame(updateCanvasSize);
    });

    resizeObserver.observe(container);

    // Initial size set
    updateCanvasSize();

    return () => {
        resizeObserver.disconnect();
    };
  }, []); // Run once on mount

  // Update context when tool/color/size changes
  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    
    context.lineCap = 'round';
    context.lineJoin = 'round';
    if (tool === 'eraser') {
      context.strokeStyle = '#ffffff';
    } else {
      context.strokeStyle = color;
    }
    context.lineWidth = brushSize;
  }, [color, brushSize, tool]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Calculate scale in case of CSS transforms or zooming
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // e.preventDefault(); // Prevent scrolling on touch
    const { x, y } = getCoordinates(e);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    // e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'painting.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-[#202020] text-slate-900 dark:text-white">
      {/* Ribbon / Toolbar */}
      <div className="flex items-center p-2 bg-slate-50 dark:bg-[#2c2c2c] border-b border-slate-200 dark:border-slate-700 space-x-4 select-none shrink-0">
        
        {/* Tools */}
        <div className="flex flex-col items-center px-2 border-r border-slate-200 dark:border-slate-600">
            <span className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Tools</span>
            <div className="flex space-x-1">
                <button 
                    onClick={() => setTool('pen')}
                    className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors ${tool === 'pen' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : ''}`}
                    title="Pencil"
                >
                    <Pencil className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setTool('eraser')}
                    className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors ${tool === 'eraser' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : ''}`}
                    title="Eraser"
                >
                    <Eraser className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Size */}
        <div className="flex flex-col items-center px-2 border-r border-slate-200 dark:border-slate-600 w-32">
             <span className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Size: {brushSize}px</span>
             <input 
                type="range" 
                min="1" 
                max="50" 
                value={brushSize} 
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
        </div>

        {/* Colors */}
        <div className="flex flex-col items-start px-2 flex-1 overflow-hidden">
             <span className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Colors</span>
             <div className="flex flex-wrap gap-1 max-w-full overflow-y-auto max-h-[60px]">
                 <div 
                    className="w-6 h-6 rounded border border-slate-300 cursor-pointer shadow-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                 >
                    {/* Current Color Indicator */}
                 </div>
                 <div className="w-[1px] h-6 bg-slate-300 dark:bg-slate-600 mx-1 flex-shrink-0"></div>
                 {colors.map((c) => (
                     <button
                        key={c}
                        onClick={() => { setColor(c); setTool('pen'); }}
                        className={`w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 hover:scale-110 transition-transform flex-shrink-0 ${color === c ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                        style={{ backgroundColor: c }}
                     />
                 ))}
             </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-auto shrink-0">
             <button onClick={clearCanvas} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors" title="Clear All">
                 <Trash2 className="w-5 h-5" />
             </button>
             <button onClick={saveImage} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition-colors" title="Save Image">
                 <Download className="w-5 h-5" />
             </button>
        </div>
      </div>

      {/* Canvas Area */}
      {/* Container must be relative and flex-1 to fill the remaining space */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-slate-200 dark:bg-[#1e1e1e] cursor-crosshair touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute top-0 left-0 block shadow-sm"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Footer Status */}
      <div className="h-6 bg-slate-50 dark:bg-[#2c2c2c] border-t border-slate-200 dark:border-slate-700 flex items-center px-2 text-[10px] text-slate-500 justify-between shrink-0">
          <div className="flex space-x-4">
              <span className="flex items-center"><MousePointer2 className="w-3 h-3 mr-1"/> {Math.round(canvasRef.current?.width || 0)} x {Math.round(canvasRef.current?.height || 0)}px</span>
          </div>
          <div>100%</div>
      </div>
    </div>
  );
};