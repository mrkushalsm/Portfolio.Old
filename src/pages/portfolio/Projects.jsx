import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../../components/portfolio/ProjectCard";
import { projects } from "../../data/projectsData";

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6">
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-8 sm:mb-12 md:mb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                PROJECTS
            </motion.h2>

            {/* Carousel Wrapper - Mobile responsive */}
            <div className="relative flex items-center justify-center">
                {/* Left Arrow - Hidden on very small screens, positioned better on larger */}
                <button
                    className="absolute left-[-20px] sm:left-[-40px] md:left-[-70px] lg:left-[-90px] z-10 bg-gray-800/40 hover:bg-gray-700/60 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition text-xs sm:text-sm md:text-base"
                    onClick={prevSlide}
                >
                    ❮
                </button>

                {/* Project Card with responsive height - Auto height to fit content */}
                <div className="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] flex justify-center items-start overflow-visible">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ scale: 0.8, opacity: 0, x: direction * 50 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0.8, opacity: 0, x: -direction * 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <ProjectCard project={projects[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-[-20px] sm:right-[-40px] md:right-[-70px] lg:right-[-90px] z-10 bg-gray-800/40 hover:bg-gray-700/60 text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition text-xs sm:text-sm md:text-base"
                    onClick={nextSlide}
                >
                    ❯
                </button>
            </div>

            {/* Interactive Indicator - Responsive sizing */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>

            {/* Mobile swipe hint */}
            <div className="flex justify-center mt-4 sm:hidden">
                <p className="text-gray-400 text-sm">Swipe or use arrows to navigate</p>
            </div>
        </div>
    );
};

export default Projects;
