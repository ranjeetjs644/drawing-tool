import React, { createContext, useContext, useState } from "react";


const ToolContext = createContext();

export const useTool = () => {
    const context = useContext(ToolContext);
    if (!context) {
        throw new Error('useTool must be used within a ToolProvider');
    }
    return context;
};

export const ToolProvider = ({ children }) => {
    const [activeTool, setActiveTool] = useState('hand');
    console.log(activeTool)

    const value = {
        activeTool,
        setActiveTool
    };

    return (
        <ToolContext.Provider value={value}>
            {children}
        </ToolContext.Provider>
    );
};