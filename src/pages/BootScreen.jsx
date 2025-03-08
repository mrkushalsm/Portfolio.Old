import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BootScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || "/desktop"; // Change default to `/desktop`

    const [step, setStep] = useState(0);
    const messages = [
        "Rebooting system...",
        "Checking disk integrity...",
        "Loading essential modules...",
        "Starting graphical interface...",
        "Initializing desktop environment...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => prev + 1);
        }, 1500);

        if (step >= messages.length) {
            clearInterval(interval);
            setTimeout(() => navigate(redirectTo), 2000); // Redirect to DesktopEnv
        }

        return () => clearInterval(interval);
    }, [step, navigate, redirectTo]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono text-lg">
            {step === 0 ? (
                <div className="text-red-500 text-2xl">Server Crashed! Restarting...</div>
            ) : (
                <>
                    <div>{messages[Math.min(step - 1, messages.length - 1)]}</div>
                    <div className="mt-4 animate-pulse">█ █ █ █ █</div>
                </>
            )}
        </div>
    );
};

export default BootScreen;
