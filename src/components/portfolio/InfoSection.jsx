import React, { useState, useEffect, useRef } from "react";

const InfoSection = () => {
    const text = "I am a passionate developer who loves creating interactive web applications and user-friendly designs.";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true); // Ensures typing starts only once
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (hasStarted && index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [index, hasStarted]);

    return (
        <div ref={sectionRef} className="p-6 rounded-lg shadow-lg text-lg max-w-lg text-center min-h-[100px]">
            <p className="text-white font-mono">
                {displayText}
                <span className="animate-pulse">{index < text.length ? "|" : ""}</span>
            </p>
        </div>
    );
};

export default InfoSection;
