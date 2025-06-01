import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiSearch, FiPower, FiUser, FiSettings, FiLock } from "react-icons/fi";

const StartMenu = ({ 
    isOpen, 
    onClose, 
    desktopIcons, 
    onAppClick,
    userName = "User" 
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("pinned");
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Check if click was on the Windows start button
                const startButton = document.querySelector('[data-start-button]');
                if (!startButton || !startButton.contains(event.target)) {
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Filter apps based on search query
    const filteredApps = desktopIcons.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pinned apps (you can customize this list)
    const pinnedApps = desktopIcons.filter(app => 
        ["Projects", "Skills", "About Me", "Terminal"].includes(app.name)
    );

    // User profile actions
    const userActions = [
        { icon: <FiUser className="w-5 h-5" />, label: `${userName}`, action: () => {} },
        { icon: <FiSettings className="w-5 h-5" />, label: "Settings", action: () => {} },
        { icon: <FiLock className="w-5 h-5" />, label: "Lock", action: () => {} },
        { icon: <FiPower className="w-5 h-5" />, label: "Sign out", action: () => {} }
    ];

    if (!isOpen) return null;

    return createPortal(
        <div 
            ref={menuRef}
            className="fixed left-2 w-96 bg-zinc-800/95 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl border border-zinc-700 text-white mb-3"
            style={{
                bottom: '60px',
                height: 'calc(100vh - 5.5rem)',
                maxHeight: '600px',
                zIndex: 9999,
                position: 'fixed',
                transform: 'translateZ(0)',
                willChange: 'transform',
                isolation: 'isolate'
            }}
        >
            {/* Search Bar */}
            <div className="p-3 border-b border-zinc-700">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type here to search"
                        className="w-full bg-zinc-700/50 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col h-[calc(100%-3.5rem)]">
                {/* Tabs */}
                <div className="flex border-b border-zinc-700">
                    <button
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'pinned' ? 'text-white bg-zinc-600/50' : 'text-gray-300 hover:bg-zinc-700/50'}`}
                        onClick={() => setActiveTab('pinned')}
                    >
                        Pinned
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'all' ? 'text-white bg-zinc-600/50' : 'text-gray-300 hover:bg-zinc-700/50'}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All apps
                    </button>
                </div>

                {/* App Grid */}
                <div className="flex-1 overflow-y-auto p-3">
                    {searchQuery ? (
                        <div className="grid grid-cols-4 gap-4">
                            {filteredApps.map((app, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col items-center p-2 rounded-md hover:bg-zinc-700/50 transition-colors"
                                    onClick={() => {
                                        onAppClick(app.name);
                                        onClose();
                                    }}
                                >
                                    <img src={app.icon} alt={app.name} className="w-10 h-10 mb-1" />
                                    <span className="text-xs text-center mt-1 truncate w-full">{app.name}</span>
                                </button>
                            ))}
                        </div>
                    ) : activeTab === 'pinned' ? (
                        <>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Pinned</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {pinnedApps.map((app, index) => (
                                    <button
                                        key={index}
                                        className="flex flex-col items-center p-2 rounded-md hover:bg-zinc-700/50 transition-colors"
                                        onClick={() => {
                                            onAppClick(app.name);
                                            onClose();
                                        }}
                                    >
                                        <img src={app.icon} alt={app.name} className="w-10 h-10 mb-1" />
                                        <span className="text-xs text-center mt-1 truncate w-full">{app.name}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-4 gap-4">
                            {desktopIcons.map((app, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col items-center p-2 rounded-md hover:bg-zinc-700/50 transition-colors"
                                    onClick={() => {
                                        onAppClick(app.name);
                                        onClose();
                                    }}
                                >
                                    <img src={app.icon} alt={app.name} className="w-10 h-10 mb-1" />
                                    <span className="text-xs text-center mt-1 truncate w-full">{app.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Profile & Power Options */}
                <div className="border-t border-zinc-700 p-2">
                    <div className="flex items-center justify-between">
                        {userActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="flex flex-col items-center p-2 rounded-md hover:bg-zinc-700/50 transition-colors w-1/4"
                            >
                                <div className="w-8 h-8 flex items-center justify-center text-gray-300">
                                    {action.icon}
                                </div>
                                <span className="text-xs text-center mt-1 truncate w-full">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default StartMenu;
