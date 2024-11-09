import React from 'react';
import { FaArrowRight, FaMinus } from 'react-icons/fa';
import { MdOutlineRectangle, MdOutlineCircle, MdOutlineImage, MdLockOutline } from "react-icons/md";
import { BsDiamond } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { CiText, CiEraser } from "react-icons/ci";
import { IoHandLeftOutline } from "react-icons/io5";
import { GrCursor } from "react-icons/gr";
import { useTool } from '../context/ToolContext.jsx';

const Toolbar = () => {
    // Destructure the context values
    const { activeTool, setActiveTool } = useTool();

    // Tools array for storing each tool's properties
    const tools = [
        { id: 'lock', icon: <MdLockOutline />, label: 'Lock' },
        { id: 'hand', icon: <IoHandLeftOutline />, label: 'Hand Tool' },
        { id: 'selection', icon: <GrCursor />, label: 'Selection', shortcut: "1" },
        { id: 'rectangle', icon: <MdOutlineRectangle />, label: 'Rectangle', shortcut: "2" },
        { id: 'circle', icon: <MdOutlineCircle />, label: 'Circle', shortcut: "3" },
        { id: 'diamond', icon: <BsDiamond />, label: 'Diamond', shortcut: "4" },
        { id: 'arrow', icon: <FaArrowRight />, label: 'Arrow', shortcut: "5" },
        { id: 'line', icon: <FaMinus />, label: 'Line', shortcut: "6" },
        { id: 'draw', icon: <GoPencil />, label: 'Draw', shortcut: "7" },
        { id: 'text', icon: <CiText />, label: 'Text', shortcut: "8" },
        { id: 'image', icon: <MdOutlineImage />, label: 'Insert Image', shortcut: "9" },
        { id: 'eraser', icon: <CiEraser />, label: 'Eraser', shortcut: "0" },
    ];

    // Function to handle tool click
    const handleToolClick = (toolId) => {
        setActiveTool(toolId);
        console.log("Tool active: ", toolId);
    };

    return (
        <div className="min-w-[45%] toolbar mx-auto flex items-center justify-evenly my-4 rounded-lg shadow-sm border">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`${activeTool === tool.id ? 'active' : ''} px-2 my- text-center relative`}
                    title={tool.label}
                >
                    <span className={`${activeTool === tool.id ? 'text-blue-500' : ''}`}>
                        {tool.icon}
                    </span>

                    <span className="absolute text-[0.6rem] text-gray-400 bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                        {tool.shortcut}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default Toolbar;