import React, { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Zoom = () => {
    const [zoom, setZoom] = useState(100);

    // Functions to handle zoom-in, zoom-out, undo, and redo
    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 200)); // max zoom 200%
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 50)); // min zoom 50%
    };

    const handleUndo = () => {
        console.log("Undo action");
    };

    const handleRedo = () => {
        console.log("Redo action");
    };

    return (
        <Space className=" " >
            <Space className="bg-gray-200 p-2 py-1 rounded-lg flex gap-2" >
                <Button
                    icon={<MinusOutlined />}
                    onClick={handleZoomOut}
                    type="text"
                    style={{ color: 'gray' }}
                    title='zoomOut'
                />
                <Text >{zoom}%</Text>
                <Button
                    icon={<PlusOutlined />}
                    onClick={handleZoomIn}
                    type="text"
                    style={{ color: 'gray' }}
                    title='zoomIn'
                />
            </Space>

            <Space className="bg-gray-200 p-2 py-1 rounded-lg flex gap-2" >
                <Button
                    icon={<UndoOutlined />}
                    onClick={handleUndo}
                    type="text"
                    title='Undo'

                />
                <Button
                    icon={<RedoOutlined />}
                    onClick={handleRedo}
                    type="text"
                    title='Redo'
                />
            </Space>
        </Space>
    );
};

export default Zoom;
