import React, { useState, useRef } from "react";
import WindowCard from "./WindowCard.jsx";
import Taskbar from "./Taskbar.jsx";
import wallpaper from "../assets/wallpaper.jpg";
import projectIcon from "../assets/icons/project.png";
import skillsIcon from "../assets/icons/skills.png";
import aboutMeIcon from "../assets/icons/info.png";

const DesktopEnv = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null); // Track active window
    const windowRefs = useRef({});

    const openFolder = (folderName) => {
        if (!openWindows.includes(folderName)) {
            setOpenWindows([...openWindows, folderName]);
            windowRefs.current[folderName] = React.createRef();
        }
        setActiveWindow(folderName); // Set the opened window as active
    };

    const closeFolder = (folderName) => {
        setOpenWindows(openWindows.filter((name) => name !== folderName));
        if (activeWindow === folderName) {
            setActiveWindow(null); // Reset active window if closed
        }
    };

    const desktopIcons = [
        {
            name: "Projects",
            icon: projectIcon
        },
        {
            name: "Skills",
            icon: skillsIcon
        },
        {
            name: "About Me",
            icon: aboutMeIcon
        }
    ];



    return (
        <div
            className="relative w-full h-screen flex flex-col items-center justify-start p-4"
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* DesktopEnv Icons */}
            <div className="absolute top-10 left-10 flex flex-col gap-6">
                {desktopIcons.map((icon) => {
                    return (
                        <div
                            key={icon.name}
                            className="flex flex-col cursor-pointer text-white justify-center items-center p-4 hover:bg-zinc-700"
                            onClick={() => openFolder(icon.name)}
                        >
                            <img src={icon.icon} alt={icon.name} height="32px" width="32px"/> <br /> {icon.name}
                        </div>
                    )})}
            </div>

            {/* Windows */}
            {openWindows.map((folder) => (
                <WindowCard
                    key={folder}
                    ref={windowRefs.current[folder]}
                    title={folder}
                    onClose={() => closeFolder(folder)}
                    isActive={activeWindow === folder} // Check if the window is active
                    onClick={() => setActiveWindow(folder)} // Set active on click
                >
                    Content for {folder} goes here.
                </WindowCard>
            ))}

            {/* Taskbar */}
            <Taskbar
                openWindows={openWindows}
                activeWindow={activeWindow}
                setActiveWindow={setActiveWindow}
                desktopIcons={desktopIcons} // ✅ Pass as prop
            />

        </div>
    );
};

export default DesktopEnv;
