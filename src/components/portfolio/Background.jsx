import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateStars = (count) =>
    new Array(count).fill(0).map(() => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 1.5, // Covers full height
        size: Math.random() * 2.5 + 1.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
    }));

const Background = () => {
    const [stars, setStars] = useState(generateStars(50));

    useEffect(() => {
        const handleResize = () => setStars(generateStars(50));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full  bg-gradient-to-b from-[#0a0f1f] to-[#02050c] pointer-events-none overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        left: `${star.x}px`,
                        top: `${star.y}px`,
                        filter: "drop-shadow(0px 0px 6px rgba(255,255,255,0.8))",
                    }}
                    initial={{ x: star.x, y: star.y, opacity: 0 }}
                    animate={{
                        x: [star.x, star.x - window.innerWidth * 0.8],
                        y: [star.y, star.y + window.innerHeight * 0.6],
                        opacity: [0, 1, 0.3, 0],
                        filter: [
                            "drop-shadow(0px 0px 6px rgba(255,255,255,0.6))",
                            "drop-shadow(0px 0px 12px rgba(255,255,255,1))",
                            "drop-shadow(0px 0px 4px rgba(255,255,255,0.4))",
                            "drop-shadow(0px 0px 0px rgba(255,255,255,0))",
                        ],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default Background;
