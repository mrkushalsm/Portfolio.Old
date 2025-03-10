import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import ProfileCard from "../../components/portfolio/ProfileCard.jsx";
import InfoSection from "../../components/portfolio/InfoSection";
import { motion } from "framer-motion";

const AboutMe = () => {
    const aboutRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={aboutRef}
            className={`flex flex-col items-center justify-center px-6 md:px-20 py-16 min-h-screen transition-opacity duration-700${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Heading Animation: Fade in from top, start big, then shrink */}
            <motion.h2
                className="text-white uppercase font-bold relative text-center"
                initial={{ y: -100, opacity: 0, fontSize: "6rem" }}
                animate={
                    isVisible
                        ? { y: 0, opacity: 1, fontSize: "3rem" }
                        : {}
                }
                transition={{ duration: 1 }}
                style={{
                    textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)"
                }}
            >
                ABOUT ME
            </motion.h2>

            {/* Centered Profile and Info Section */}
            <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 w-full">
                {/* Profile Image & Name Card */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <ProfileCard />
                </motion.div>

                {/* Info Section with Typewriter Effect */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <InfoSection />
                </motion.div>
            </div>
        </div>
    );
};

export default AboutMe;
