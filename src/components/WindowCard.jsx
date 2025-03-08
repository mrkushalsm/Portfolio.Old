import React, { forwardRef } from "react";
import Draggable from "react-draggable";

const WindowCard = forwardRef(({ title, onClose, children, isActive, onClick }, ref) => {
    return (
        <Draggable nodeRef={ref} handle=".drag-handle">
            <div
                ref={ref}
                className={`flex flex-col bg-white shadow-lg w-64 h-48 border 
                ${isActive ? "border-blue-500 shadow-2xl opacity-100 w-100 h-84" : "border-gray-500 shadow-md opacity-75"}`}
            >
                <div onMouseDown={onClick}>
                    {/* Window Title Bar (Drag Handle) */}
                    <div className="drag-handle flex justify-between items-center bg-gray-800 text-white p-2 cursor-default">
                        <span>{title}</span>
                        <button onClick={onClose}>
                            <svg className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Window Content */}
                    <div className="p-4 text-gray-700">{children} </div>
                </div>
            </div>
        </Draggable>
    );
});

export default WindowCard;
