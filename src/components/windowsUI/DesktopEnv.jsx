import React, { useState, useRef } from "react";
import WindowCard from "./WindowCard.jsx";
import Taskbar from "./Taskbar.jsx";
import wallpaper from "/assets/wallpaper.jpg";
import projectIcon from "/assets/icons/project.png";
import skillsIcon from "/assets/icons/skills.png";
import aboutMeIcon from "/assets/icons/info.png";
import portfolioIcon from "/assets/icons/exe.png";
import certificateIcon from "/assets/icons/certificate.png";
import blogsIcon from "/assets/icons/blogs.png";
import resumeIcon from "/assets/icons/resume.png";
import AboutMe from "../../pages/windowsUI/AboutMe";
import Projects from "../../pages/windowsUI/Projects";
import Skills from "../../pages/windowsUI/Skills";
import Certificates from "../../pages/windowsUI/Certificates.jsx";
import Blogs from "../../pages/windowsUI/Blogs.jsx";
import Resume from "../../pages/windowsUI/Resume.jsx";
import PortfolioLoader from "./PortfolioLoader.jsx";

const DesktopEnv = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const windowRefs = useRef({});

    // Define a mapping of components
    const componentMap = {
        "Projects": <Projects />,
        "Skills": <Skills />,
        "About Me": <AboutMe />,
        "Certificates": <Certificates />,
        "Blogs": <Blogs />,
        "Resume": <Resume />,
        "portfolio.exe": <PortfolioLoader />, // ✅ Portfolio window shows a terminal-style loader
    };


    const openFolder = (folderName) => {
        if (folderName === "portfolio.exe") {
            if (!openWindows.includes("portfolio.exe")) {
                setOpenWindows([...openWindows, "portfolio.exe"]);
                windowRefs.current["portfolio.exe"] = React.createRef();
            }
            setActiveWindow("portfolio.exe");
            return;
        }

        if (!openWindows.includes(folderName)) {
            setOpenWindows([...openWindows, folderName]);
            windowRefs.current[folderName] = React.createRef();
        }
        setActiveWindow(folderName);
    };

    const closeFolder = (folderName) => {
        setOpenWindows(openWindows.filter((name) => name !== folderName));
        if (activeWindow === folderName) {
            setActiveWindow(null);
        }
    };

    const desktopIcons = [
        { name: "Projects", icon: projectIcon },
        { name: "Skills", icon: skillsIcon },
        { name: "About Me", icon: aboutMeIcon },
        { name: "Certificates", icon: certificateIcon },
        { name: "Blogs", icon: blogsIcon },
        { name: "Resume", icon: resumeIcon },
        { name: "portfolio.exe", icon: portfolioIcon },
    ];

    return (
        <div
            className="relative w-full h-screen grid grid-cols-4 p-4"
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Desktop Icons */}
            <div className="absolute top-10 left-10 flex flex-col gap-6">
                {desktopIcons.map((icon) => (
                    <div
                        key={icon.name}
                        className="flex flex-col cursor-pointer text-white justify-center items-center p-4 hover:bg-zinc-700"
                        onClick={() => openFolder(icon.name)}
                    >
                        <img src={icon.icon} alt={icon.name} height="32px" width="32px" />
                        <br /> {icon.name}
                    </div>
                ))}
            </div>

            {/* Windows */}
            {openWindows.map((folder) => (
                <WindowCard
                    key={folder}
                    ref={windowRefs.current[folder]}
                    title={folder}
                    onClose={() => closeFolder(folder)}
                    isActive={activeWindow === folder}
                    onClick={() => setActiveWindow(folder)}
                >
                    {componentMap[folder] || `Content for ${folder} goes here.`}
                </WindowCard>
            ))}

            {/* Taskbar */}
            <Taskbar
                openWindows={openWindows}
                activeWindow={activeWindow}
                setActiveWindow={setActiveWindow}
                desktopIcons={desktopIcons}
            />
        </div>
    );
};

export default DesktopEnv;
