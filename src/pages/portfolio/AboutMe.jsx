import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import ProfileCard from "../../components/portfolio/ProfileCard.jsx";
import InfoSection from "../../components/portfolio/InfoSection";
import EducationTimeline from "../../components/portfolio/EducationTimeline";
import SpokenLanguages from "../../components/portfolio/SpokenLanguages";
import { motion, AnimatePresence } from "framer-motion";

const AboutMe = () => {
    const aboutRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState(0); // 0 = About Me, 1 = Education Timeline

    const sections = [
        {
            id: 0,
            title: "ABOUT ME",
            content: "profile"
        },
        {
            id: 1,
            title: "EDUCATION JOURNEY",
            content: "education"
        },
        {
            id: 2,
            title: "LANGUAGES I KNOW",
            content: "languages"
        }
    ];

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

    const nextSection = () => {
        setCurrentSection((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
    };

    const prevSection = () => {
        setCurrentSection((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
    };

    const goToSection = (index) => {
        setCurrentSection(index);
    };

    return (
        <div
            ref={aboutRef}
            className={`relative flex flex-col items-center justify-center px-6 md:px-20 py-16 min-h-screen transition-opacity duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Section Navigation Arrows - Relative to content container */}
            <div className="absolute top-1/2 left-30 transform -translate-y-1/2 z-10">
                <button
                    className="bg-gray-800/40 hover:bg-gray-700/60 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
                    onClick={prevSection}
                >
                    ←
                </button>
            </div>

            <div className="absolute top-1/2 right-25 transform -translate-y-1/2 z-10">
                <button
                    className="bg-gray-800/40 hover:bg-gray-700/60 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition"
                    onClick={nextSection}
                >
                    →
                </button>
            </div>

            {/* Dynamic Section Title */}
            <motion.h2
                key={currentSection}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-8 sm:mb-12 md:mb-20"
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
                {sections[currentSection].title}
            </motion.h2>

            {/* Section Content with Fade Transitions */}
            <AnimatePresence mode="wait">
                {currentSection === 0 && (
                    <motion.div
                        key="about-content"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 w-full"
                    >
                        {/* Profile Image & Name Card */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <ProfileCard
                                title="Kushal SM"
                                subtitle="Full Stack Developer"
                                defaultImage="/assets/profile.jpeg"
                                hoverImage="/assets/profile.jpeg"
                                backgroundImage="/assets/profilecardhover.png"
                                width="250px"
                                height="350px"
                                mdWidth="300px"
                                mdHeight="400px"
                            />
                        </motion.div>

                        {/* Info Section with Typewriter Effect */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            <InfoSection />
                        </motion.div>
                    </motion.div>
                )}

                {currentSection === 1 && (
                    <motion.div
                        key="education-content"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="mt-10 w-full"
                    >
                        <EducationTimeline />
                    </motion.div>
                )}

                {currentSection === 2 && (
                    <motion.div
                        key="languages-content"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="mt-10 w-full"
                    >
                        <SpokenLanguages />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section Indicator Dots - Below the content */}
            <div className="mt-16 flex justify-center space-x-4">
                {sections.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSection(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSection === index ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AboutMe;
