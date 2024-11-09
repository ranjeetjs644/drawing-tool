import React from 'react';
import { FaRegShareSquare } from "react-icons/fa";
import { Button } from "antd";

const Share = () => {
    return (
        <>
            <Button type='primary' className='bg-green-500'><span><FaRegShareSquare /></span><span>Share</span></Button>
        </>
    );
}

export default Share;
