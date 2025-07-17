import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";

const EducationTimeline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const educationData = [
        {
            id: 1,
            title: "High School",
            institution: "Gopalan National School",
            shortForm: "GNS",
            year: "2018-2020",
            defaultImage: "/assets/education/logo/gns-logo.png",
            hoverImage: "/assets/education/institution/gns.png",
            description: "Completed my secondary education with focus on Science and Mathematics.",
            defaultImgWidth: "w-max",
            defaultImgHeight: "h-60",
            hoverImgWidth: "w-60",
            hoverImgHeight: "h-80"
        },
        {
            id: 2,
            title: "Pre-University",
            institution: "Shree Ram Global OMR",
            shortForm: "SRG OMR",
            year: "2020-2022",
            defaultImage: "/assets/education/logo/srgs-logo.png",
            hoverImage: "/assets/education/institution/srgs.png",
            description: "Studied Computer Science stream with Mathematics, Physics, and Chemistry.",
            defaultImgWidth: "w-max",
            defaultImgHeight: "h-60",
            hoverImgWidth: "w-60",
            hoverImgHeight: "h-80"
        },
        {
            id: 3,
            title: "Engineering",
            institution: "Sahyadri College of Engineering & Management",
            shortForm: "SCEM",
            year: "2022-2026",
            defaultImage: "/assets/education/logo/scem-logo.png",
            hoverImage: "/assets/education/institution/scem.png",
            description: "Pursuing Bachelor's in Computer Science & Engineering.",
            defaultImgWidth: "w-46",
            defaultImgHeight: "h-60",
            hoverImgWidth: "w-60",
            hoverImgHeight: "h-80"
        }
    ];

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
            {/* Timeline Navigation Dots - Minimal, with titles and a single continuous line */}
            <div className="flex flex-col items-center mb-12">
                <div className="relative flex flex-col items-center w-full max-w-md">
                    {/* Line perfectly centered with the dots */}
                    <div className="absolute left-0 right-0 top-1/4 h-1 bg-white z-0" style={{transform: 'translateY(-50%)'}} />
                    <div className="flex flex-row items-end justify-between w-full relative z-10 gap-8 px-4">
                        {educationData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <button
                                    onClick={() => goToSlide(index)}
                                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none
                                        ${currentIndex === index ? 'bg-white border-black scale-125 shadow-lg' : 'bg-black border-white hover:border-gray-400'}
                                    `}
                                    style={{ position: 'relative', zIndex: 2 }}
                                >
                                    <span className={`block w-3 h-3 rounded-full transition-all duration-300
                                        ${currentIndex === index ? 'bg-white' : 'bg-black'}
                                    `}></span>
                                </button>
                                <span className="mt-2 text-xs font-medium text-white text-center w-20 truncate">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Card Container */}
            <div className="w-full max-w-4xl mx-auto flex justify-center items-center min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ scale: 0.8, opacity: 0, x: direction * 100 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.8, opacity: 0, x: -direction * 100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
                    >
                        {/* Profile Card */}
                        <div className="flex-shrink-0">
                            <ProfileCard
                                title={educationData[currentIndex].shortForm}
                                subtitle={educationData[currentIndex].year}
                                defaultImage={educationData[currentIndex].defaultImage}
                                hoverImage={educationData[currentIndex].hoverImage}
                                width="280px"
                                height="380px"
                                mdWidth="320px"
                                mdHeight="420px"
                                defaultImgWidth = {educationData[currentIndex].defaultImgWidth}
                                defaultImgHeight = {educationData[currentIndex].defaultImgHeight}
                                hoverImgWidth = {educationData[currentIndex].hoverImgWidth}
                                hoverImgHeight = {educationData[currentIndex].hoverImgHeight}
                                showBorder={false}
                                showRounded={false}
                            />
                        </div>

                        {/* Education Details */}
                        <div className="flex-1 max-w-md text-center md:text-left">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {educationData[currentIndex].institution}
                                </h3>
                                <h4 className="text-xl text-gray-300 mb-4">
                                    {educationData[currentIndex].title}
                                </h4>
                                <p className="text-lg text-gray-400 mb-4">
                                    {educationData[currentIndex].year}
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    {educationData[currentIndex].description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EducationTimeline;
