import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../../components/portfolio/ProjectCard";
import weatherApp from "../../assets/projectImg/weatherapp.png";
import portfolioWebsite from "../../assets/projectImg/portfoliowebsite.png";

const projects = [
    {
        name: "Weather App",
        description: "Real-time weather updates with OpenWeather API.",
        image: weatherApp,
        link: "https://weather-app-teal-omega.vercel.app/",
    },
    {
        name: "Portfolio Website",
        description: "A personal portfolio styled like a Windows desktop.",
        image: portfolioWebsite,
        link: "",
    },
    {
        name: "Task Manager",
        description: "Drag-and-drop task management with ease.",
        image: "https://source.unsplash.com/500x300/?task,management",
        link: "",
    },
    {
        name: "E-Commerce Platform",
        description: "A full-stack online shopping experience.",
        image: "https://source.unsplash.com/500x300/?ecommerce",
        link: "",
    },
];

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto py-10">
            <motion.h2
                className="text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                PROJECTS
            </motion.h2>



            {/* Carousel Wrapper */}
            <div className="relative flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    className="absolute left-[-90px] z-10 bg-gray-800/20 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 transition"
                    onClick={prevSlide}
                >
                    ❮
                </button>

                {/* Project Card with Framer Motion Animation */}
                <div className="w-full h-[500px] flex justify-center items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ scale: 0.8, opacity: 0, x: direction * 100 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0.8, opacity: 0, x: -direction * 100 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <ProjectCard project={projects[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-[-90px] z-10 bg-gray-800/20 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 transition"
                    onClick={nextSlide}
                >
                    ❯
                </button>
            </div>

            {/* Interactive Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
                {projects.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? "bg-white scale-125" : "bg-gray-500"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
