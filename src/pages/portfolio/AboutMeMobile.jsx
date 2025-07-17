import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import ProfileCard from "../../components/portfolio/ProfileCard.jsx";
import InfoSection from "../../components/portfolio/InfoSection";
import SpokenLanguages from "../../components/portfolio/SpokenLanguages";
import { motion, AnimatePresence } from "framer-motion";
import EducationTimelineMobile from "../../components/portfolio/EducationTimelineMobile.jsx";

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
            className={`relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 py-10 sm:py-16 min-h-screen transition-opacity duration-700 overflow-x-hidden ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >


            {/* Section Navigation Arrows - Better positioned for all screen sizes */}
            <div className="absolute top-1/2 left-0 sm:left-4 md:left-8 transform -translate-y-1/2 z-10">
                <button
                    className="bg-gray-800/40 hover:bg-gray-700/60 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition"
                    onClick={prevSection}
                    aria-label="Previous section"
                >
                    <span className="text-sm sm:text-base md:text-lg">←</span>
                </button>
            </div>

            <div className="absolute top-1/2 right-0 sm:right-4 md:right-8 transform -translate-y-1/2 z-10">
                <button
                    className="bg-gray-800/40 hover:bg-gray-700/60 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition"
                    onClick={nextSection}
                    aria-label="Next section"
                >
                    <span className="text-sm sm:text-base md:text-lg">→</span>
                </button>
            </div>

            {/* Dynamic Section Title - More responsive text sizing */}
            <motion.h2
                key={currentSection}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-6 sm:mb-8 md:mb-12 px-8"
                initial={{ y: -50, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                style={{
                    textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)"
                }}
            >
                {sections[currentSection].title}
            </motion.h2>

            {/* Section Content with Fade Transitions */}
            <div className="w-full max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {currentSection === 0 && (
                        <motion.div
                            key="about-content"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="mt-8 sm:mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 w-full"
                        >
                            {/* Profile Image & Name Card - Centered on mobile and desktop */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full flex justify-center md:justify-start md:w-auto"
                            >
                                <ProfileCard
                                    title="Kushal SM"
                                    subtitle="Full Stack Developer"
                                    defaultImage="/assets/profile.jpeg"
                                    hoverImage="/assets/profile.jpeg"
                                    backgroundImage="/assets/profilecardhover.png"
                                    width="220px"
                                    height="320px"
                                    mdWidth="250px"
                                    mdHeight="350px"
                                />
                            </motion.div>

                            {/* Info Section with Typewriter Effect */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="w-full md:max-w-lg lg:max-w-xl"
                            >
                                <InfoSection />
                            </motion.div>
                        </motion.div>
                    )}

                    {currentSection === 1 && (
                        <motion.div
                            key="education-content"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="mt-8 sm:mt-12 w-full"
                        >
                            <EducationTimelineMobile />
                        </motion.div>
                    )}

                    {currentSection === 2 && (
                        <motion.div
                            key="languages-content"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="mt-8 sm:mt-12 w-full"
                        >
                            <SpokenLanguages />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section Indicator Dots - Better spacing and sizing for mobile */}
            <div className="mt-10 sm:mt-12 md:mt-16 flex justify-center space-x-3 sm:space-x-4">
                {sections.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSection(index)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            currentSection === index ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to ${sections[index].title} section`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AboutMe;