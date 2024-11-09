import React, { createContext, useState, useContext } from 'react';

const DrawingContext = createContext();

export const useDrawing = () => {
    return useContext(DrawingContext);
};

export const DrawingProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
    const [currentCoords, setCurrentCoords] = useState({ x: 0, y: 0 });
    const [shapes, setShapes] = useState([]); // Initialize as empty array
    const [selectedShape, setSelectedShape] = useState(null);
    const [freeDrawPoints, setFreeDrawPoints] = useState([]);


    return (
        <DrawingContext.Provider
            value={{
                isDrawing,
                setIsDrawing,
                startCoords,
                setStartCoords,
                currentCoords,
                setCurrentCoords,
                shapes,
                setShapes,
                selectedShape,
                setSelectedShape,
                freeDrawPoints,
                setFreeDrawPoints
            }}
        >
            {children}
        </DrawingContext.Provider>
    );
};
