import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PortfolioLoader = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [currentLine, setCurrentLine] = useState("");
    const messages = [
        "Initializing system...",
        "Loading fonts...",
        "Fetching components...",
        "Setting up environment...",
        "Almost there...",
        "Redirecting to portfolio..."
    ];

    useEffect(() => {
        let messageIndex = 0;
        let charIndex = 0;

        const typeWriter = setInterval(() => {
            if (messageIndex < messages.length) {
                const currentMessage = messages[messageIndex];

                if (charIndex <= currentMessage.length) {
                    setCurrentLine(currentMessage.substring(0, charIndex + 1)); // Include first letter properly
                    charIndex++;
                } else {
                    setLogs((prevLogs) => [...prevLogs, currentMessage]); // Add full line to logs
                    setCurrentLine(""); // Reset for next message
                    messageIndex++;
                    charIndex = 0;
                }
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    navigate("/portfolio"); // Redirect after final log
                }, 1000);
            }
        }, 50); // Typing speed

        return () => clearInterval(typeWriter);
    }, [navigate]);

    return (
        <div className="bg-black text-green-400 font-mono p-4 h-full overflow-auto">
            {logs.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
            {currentLine && <div className="inline">{currentLine}<span className="animate-blink">|</span></div>}
        </div>
    );
};

export default PortfolioLoader;
