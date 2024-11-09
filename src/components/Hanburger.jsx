import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Drawer, Menu, Typography } from 'antd';
import {
    FileOutlined,
    SaveOutlined,
    ExportOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    SearchOutlined,
    QuestionCircleOutlined,
    RestOutlined,
    StarOutlined,
    GithubOutlined,
    HeartOutlined,
    MessageOutlined,
    UserAddOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const Hamburger = () => {
    const [visible, setVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);

    // Array of menu items
    const menuItems = [
        { key: "open", icon: <FileOutlined />, label: "Open" },
        { key: "save", icon: <SaveOutlined />, label: "Save to..." },
        { key: "export", icon: <ExportOutlined />, label: "Export image..." },
        { key: "collab", icon: <TeamOutlined />, label: "Live collaboration..." },
        { key: "command", icon: <ThunderboltOutlined />, label: "Command palette" },
        { key: "find", icon: <SearchOutlined />, label: "Find on canvas" },
        { key: "help", icon: <QuestionCircleOutlined />, label: "Help" },
        { key: "reset", icon: <RestOutlined />, label: "Reset the canvas" },
        { key: "pro", icon: <StarOutlined />, label: "Excalidraw+" },
        { key: "github", icon: <GithubOutlined />, label: "GitHub" },
        { key: "follow", icon: <HeartOutlined />, label: "Follow us" },
        { key: "discord", icon: <MessageOutlined />, label: "Discord chat" },
        { key: "signup", icon: <UserAddOutlined />, label: <Text strong style={{ color: '#1890ff' }}>Sign up</Text> }
    ];

    // Toggle drawer visibility
    const toggleDrawer = () => {
        setVisible(!visible);
    };

    // Handle menu item selection
    const handleSelectedMenu = (menuKey) => {
        setSelectedMenu(menuKey);
    };


    // this is for debigging
    // Log selectedMenu whenever it changes
    // useEffect(() => {
    //     console.log('selectedMenu: ', selectedMenu);
    // }, [selectedMenu]);

    return (
        <>
            {/* Hamburger Icon */}
            <span
                className="menuBar bg-gray-200 p-2 rounded-md cursor-pointer"
                onClick={toggleDrawer}
            >
                <RxHamburgerMenu />
            </span>

            {/* Drawer Component */}
            <Drawer
                title="Menu"
                placement="left"
                onClose={() => setVisible(false)}
                open={visible} // Updated to `open` instead of `visible`
                width={250}
                className="custom-drawer"
            >
                <Menu
                    mode="inline"
                    selectedKeys={[selectedMenu]} // Automatically highlight the selected menu item
                >
                    {menuItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            onClick={() => handleSelectedMenu(item.key)}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Drawer>
        </>
    );  
};

export default Hamburger;
