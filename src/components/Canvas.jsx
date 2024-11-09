import React, { useRef, useEffect } from 'react';
import { useTool } from '../context/ToolContext'; // Import ToolContext
import { useDrawing } from '../context/DrawingContext'; // Import DrawingContext

const Canvas = () => {
    const canvasRef = useRef();
    const { activeTool } = useTool(); // Get active tool from ToolContext
    const {
        isDrawing,
        setIsDrawing,
        startCoords,
        setStartCoords,
        currentCoords,
        setCurrentCoords,
        shapes,
        setShapes,
        selectedShape,
        setSelectedShape
    } = useDrawing(); // Get drawing state from DrawingContext

    // Handle mouse down event
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (activeTool === 'select') {
            const shape = shapes.find((shape) => isPointInShape({ x, y }, shape));
            setSelectedShape(shape);
        } else if (activeTool === 'eraser') {
            setShapes((prevShapes) =>
                prevShapes.filter((shape) => !isPointInShape({ x, y }, shape))
            );
        } else {
            setIsDrawing(true);
            setStartCoords({ x, y });
            setCurrentCoords({ x, y });
        }
    };

    // Handle mouse move event
    const handleMouseMove = (e) => {
        if (isDrawing && activeTool !== 'select') {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setCurrentCoords({ x, y });
        }
    };

    // Handle mouse up event
    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            const newShape = {
                id: Date.now(),
                tool: activeTool,
                start: startCoords,
                end: currentCoords,
            };
            setShapes((prevShapes) => [...prevShapes, newShape]);
        }
    };

    // Check if the point is within the shape
    const isPointInShape = (point, shape) => {
        const { start, end, tool } = shape;

        switch (tool) {
            case 'rectangle':
                return (
                    point.x >= Math.min(start.x, end.x) &&
                    point.x <= Math.max(start.x, end.x) &&
                    point.y >= Math.min(start.y, end.y) &&
                    point.y <= Math.max(start.y, end.y)
                );
            case 'circle':
                const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
                const distance = Math.sqrt(Math.pow(point.x - start.x, 2) + Math.pow(point.y - start.y, 2));
                return distance <= radius;
            case 'diamond':
                const halfWidth = Math.abs(end.x - start.x) / 2;
                const halfHeight = Math.abs(end.y - start.y) / 2;
                return (
                    point.x >= Math.min(start.x - halfWidth, start.x + halfWidth) &&
                    point.x <= Math.max(start.x - halfWidth, start.x + halfWidth) &&
                    point.y >= Math.min(start.y - halfHeight, start.y + halfHeight) &&
                    point.y <= Math.max(start.y - halfHeight, start.y + halfHeight)
                );
            case 'line':
                const lineDistance = Math.abs((end.y - start.y) * point.x - (end.x - start.x) * point.y + end.x * start.y - end.y * start.x) / Math.sqrt(Math.pow(end.y - start.y, 2) + Math.pow(end.x - start.x, 2));
                return lineDistance < 5; // threshold for line detection
            case 'arrow':
                // Arrow detection logic can be similar to line, but you might want to adjust the area for the arrowhead.
                return false; // Placeholder logic
            default:
                return false;
        }
    };

    // Draw shape logic
    const drawShape = (context, shape) => {
        const { tool, start, end } = shape;
        context.beginPath();
        switch (tool) {
            case 'rectangle':
                context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
                context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
                break;
            case 'line':
                context.moveTo(start.x, start.y);
                context.lineTo(end.x, end.y);
                break;
            case 'diamond':
                const halfWidth = Math.abs(end.x - start.x) / 2;
                const halfHeight = Math.abs(end.y - start.y) / 2;
                context.moveTo(start.x - halfWidth, start.y);
                context.lineTo(start.x, start.y - halfHeight);
                context.lineTo(start.x + halfWidth, start.y);
                context.lineTo(start.x, start.y + halfHeight);
                context.closePath();
                break;
            case 'arrow':
                const angle = Math.atan2(end.y - start.y, end.x - start.x);
                const headLength = 15;
                const arrowWidth = 10;

                // Draw the main line of the arrow
                context.moveTo(start.x, start.y);
                context.lineTo(end.x, end.y);

                // Draw the arrowhead
                context.lineTo(
                    end.x - headLength * Math.cos(angle - Math.PI / 6),
                    end.y - headLength * Math.sin(angle - Math.PI / 6)
                );
                context.moveTo(end.x, end.y);
                context.lineTo(
                    end.x - headLength * Math.cos(angle + Math.PI / 6),
                    end.y - headLength * Math.sin(angle + Math.PI / 6)
                );
                break;
            default:
                break;
        }
        context.stroke();
    };

    // Effect to handle drawing on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach((shape) => drawShape(context, shape));

        if (isDrawing && activeTool !== 'select') {
            drawShape(context, { tool: activeTool, start: startCoords, end: currentCoords });
        }
    }, [shapes, isDrawing, currentCoords, activeTool]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#f0f0f0',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default Canvas;
