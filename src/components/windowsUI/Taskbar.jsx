import React, { useState, useEffect } from "react";
import windowsIcon from "/assets/taskbar/windows-icon.png";
import volumeMute from "/assets/taskbar/volume-mute.png";
import wifi from "/assets/taskbar/wifi.png";
import battery from "/assets/taskbar/battery.png";

const Taskbar = ({ openWindows, activeWindow, setActiveWindow, desktopIcons }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 text-white p-2 flex justify-between items-center">
            {/* Left side: Windows button + Opened Apps */}
            <div className="flex gap-4">
                <button className="p-2 rounded hover:bg-zinc-800 w-9 h-9">
                    <img src={windowsIcon} alt="Windows icon" />
                </button>

                {/* Show icons instead of names */}
                {openWindows.map((window) => {
                    const iconData = desktopIcons.find((icon) => icon.name === window);
                    return (
                        <button
                            key={window}
                            className={`p-2 rounded cursor-pointer flex items-center hover:bg-zinc-800 ${
                                activeWindow === window ? "bg-zinc-800" : ""
                            }`}
                            onClick={() => setActiveWindow(window)}
                        >
                            {iconData && <img src={iconData.icon} alt={window} className="w-6 h-6" />}
                        </button>
                    );
                })}
            </div>

            {/* Right side: System Tray (WiFi, Battery, Volume, Clock) */}
            <div className="flex items-center gap-3 mr-4">
                <img src={wifi} alt="WiFi" className="w-9 h-9 hover:bg-zinc-800 p-2 rounded" />
                <img src={battery} alt="Battery" className="w-10 h-10 hover:bg-zinc-800 p-2 rounded" />
                <img src={volumeMute} alt="Volume" className="w-9 h-9 hover:bg-zinc-800 p-2 rounded" />
                <span className="hover:bg-zinc-800 p-2 rounded">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
        </div>
    );
};

export default Taskbar;
