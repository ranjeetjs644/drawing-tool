import React from "react";
import Header from "./components/Header";
import Canvas from "./components/Canvas"; // Import your Canvas component
import Zoom from "./components/Zoom";
import { ToolProvider } from "./context/ToolContext.jsx";
import { DrawingProvider } from "./context/DrawingContext.jsx";

const App = () => {
    return (
        <div className="w-screen h-screen rc-select-allow-clear relative">
            <ToolProvider>
                <DrawingProvider>
                    <Header />
                    <Canvas className="w-full h-full" /> {/* Add your Canvas component here */}
                    <div className="zoom absolute bottom-4 left-5">
                        <Zoom />
                    </div>
                </DrawingProvider>
            </ToolProvider>
        </div>
    );
};

export default App;
