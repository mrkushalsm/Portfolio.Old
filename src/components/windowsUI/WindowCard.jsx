import React, { forwardRef, useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const WindowCard = forwardRef(({ 
    title, 
    onClose, 
    children, 
    isActive, 
    isVisible = true, 
    onMinimize,
    onClick 
}, ref) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    // Desktop and mobile size presets
    const desktopSize = { width: '20vw', height: '50vh' };
    const mobileSize = { width: '95vw', height: '70vh' };
    
    const [size, setSize] = useState(isMobile ? mobileSize : desktopSize);
    const originalPosition = useRef({ x: 0, y: 0 });
    const originalSize = useRef(isMobile ? { ...mobileSize } : { ...desktopSize });
    const isInitialMount = useRef(true);

    // Handle window resize and mobile/desktop detection
    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth < 768;
            if (mobileCheck !== isMobile) {
                setIsMobile(mobileCheck);
                // Update size based on new viewport
                const newSize = mobileCheck ? mobileSize : desktopSize;
                setSize(newSize);
                originalSize.current = { ...newSize };
            }
            
            // Update position
            if (ref?.current) {
                const windowEl = ref.current;
                const maxX = window.innerWidth - windowEl.offsetWidth;
                const maxY = window.innerHeight - windowEl.offsetHeight;
                
                let newX = (window.innerWidth - windowEl.offsetWidth) / 2;
                let newY = (window.innerHeight - windowEl.offsetHeight) / 3;
                
                // Ensure window stays within viewport bounds
                newX = Math.max(10, Math.min(newX, maxX - 10));
                newY = Math.max(10, Math.min(newY, maxY - 10));
                
                setPosition({ x: newX, y: newY });
                originalPosition.current = { x: newX, y: newY };
            }
        };
        
        if (isInitialMount.current) {
            handleResize();
            isInitialMount.current = false;
        }
        
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ref]);

    const handleMaximize = () => {
        if (isMaximized) {
            // Restore to original position and size
            setPosition(originalPosition.current);
            setSize(originalSize.current);
        } else {
            // Save current position and size before maximizing
            if (ref?.current) {
                const rect = ref.current.getBoundingClientRect();
                originalPosition.current = { x: rect.left, y: rect.top };
                originalSize.current = { width: `${rect.width}px`, height: `${rect.height}px` };
                
                // Set to fullscreen
                setPosition({ x: 0, y: 0 });
                setSize({ 
                    width: '100vw', 
                    height: '100vh',
                    margin: 0,
                    borderRadius: 0
                });
            }
        }
        setIsMaximized(!isMaximized);
    };

    const handleMinimize = () => onMinimize?.();

    const handleDrag = (e, data) => {
        if (!isMaximized && ref?.current) {
            const windowEl = ref.current;
            const maxX = window.innerWidth - windowEl.offsetWidth;
            const maxY = window.innerHeight - windowEl.offsetHeight;
            
            // Constrain position to viewport bounds with 10px padding
            const newX = Math.max(10, Math.min(data.x, maxX - 10));
            const newY = Math.max(10, Math.min(data.y, maxY - 10));
            
            setPosition({ x: newX, y: newY });
        }
    };

    if (!isVisible) return null;

    return (
        <Draggable 
            nodeRef={ref} 
            handle=".drag-handle"
            bounds={isMaximized ? '' : 'parent'}
            cancel=".window-control"
            position={isMaximized ? { x: 0, y: 0 } : position}
            onDrag={handleDrag}
        >
            <div
                ref={ref}
                className={`flex flex-col ${isActive ? 'bg-white' : 'bg-white/90'} shadow-lg border rounded-lg overflow-hidden resize
                ${isActive ? "border-blue-400/30 shadow-lg" : "border-gray-300/50 opacity-90"}
                ${isMaximized ? "!rounded-none" : ""}
                touch-none md:touch-auto
                transition-all duration-200 ease-out
                will-change-transform`}
                style={{
                    position: isMaximized ? 'fixed' : 'absolute',
                    width: isMaximized ? '100%' : size.width,
                    height: isMaximized ? '100%' : `calc(${size.height} - ${window.innerWidth < 768 ? '10%' : '0%'})`,
                    left: isMaximized ? 0 : 'auto',
                    top: isMaximized ? 0 : 'auto',
                    zIndex: isActive ? (isMaximized ? 1000 : 50) : 40,
                    maxWidth: isMaximized ? '100%' : (isMobile ? '95vw' : '90vw'),
                    maxHeight: isMaximized ? '100%' : (isMobile ? '80vh' : '85vh'),
                    touchAction: 'none',
                    ...(isMaximized ? size : {})
                }}
            >
                <div className="flex flex-col h-full">
                    {/* Window Title Bar */}
                    <div 
                        className="drag-handle flex justify-between items-center bg-gray-800/90 text-white p-2 cursor-default"
                        onMouseDown={onClick}
                    >
                        <span className="ml-2 font-medium text-sm truncate flex-1">{title}</span>
                        <div className="flex space-x-2">
                            <button 
                                onClick={handleMinimize}
                                className="window-control p-1 rounded hover:bg-gray-600/50 flex items-center justify-center w-6 h-6"
                                aria-label="Minimize"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 10H15" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                            <button 
                                onClick={handleMaximize}
                                className="window-control p-1 rounded hover:bg-gray-600/50 flex items-center justify-center w-6 h-6"
                                aria-label={isMaximized ? "Restore" : "Maximize"}
                            >
                                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                    {isMaximized ? (
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m13 0V5a2 2 0 0 0-2-2h-3m0 13h3a2 2 0 0 0 2-2v-3M3 12v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="2" />
                                    ) : (
                                        <path d="M5 5H15V15H5V5Z" stroke="currentColor" strokeWidth="2" />
                                    )}
                                </svg>
                            </button>
                            <button 
                                onClick={onClose}
                                className="window-control p-1 rounded hover:bg-red-500/80 flex items-center justify-center w-6 h-6"
                                aria-label="Close"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Window Content */}
                    <div 
                        className="flex-1 overflow-auto p-4 text-gray-700"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Draggable>
    );
});

export default WindowCard;
