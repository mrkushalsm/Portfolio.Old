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
        <div className="w-full max-w-5xl mx-auto py-2 sm:py-4 px-2 sm:px-4">
            {/* Timeline Navigation Dots - Improved positioning and spacing */}
            <div className="flex flex-col items-center mb-25 sm:mb-10 relative">
                <div className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm">
                    {/* Line perfectly centered with the dots - lowered z-index */}
                    <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-white" style={{transform: 'translateY(-50%)', zIndex: 1}} />
                    <div className="flex flex-row items-end justify-between w-full relative px-2 sm:px-4" style={{zIndex: 5}}>
                        {educationData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center mb-1">
                                <button
                                    onClick={() => goToSlide(index)}
                                    className={`w-4.5 h-4.5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full border-1 sm:border-2 transition-all duration-300 focus:outline-none
                                        ${currentIndex === index ? 'bg-white border-black scale-110 shadow-md' : 'bg-black border-white hover:border-gray-400'}
                                    `}
                                    style={{ position: 'relative', zIndex: 5 }}
                                >
                                    <span className={`block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300
                                        ${currentIndex === index ? 'bg-white' : 'bg-black'}
                                    `}></span>
                                </button>
                                <span className="mt-1 text-xs font-medium text-white text-center w-14 sm:w-16 truncate">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline Card Container - With additional spacing for mobile */}
            <div className="w-full mx-auto flex justify-center items-center pt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ scale: 0.9, opacity: 0, x: direction * 50 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.9, opacity: 0, x: -direction * 50 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full"
                    >
                        {/* Profile Card - Smaller on mobile with adjusted positioning */}
                        <div className="flex-shrink-0 w-full flex justify-center md:justify-start md:w-auto">
                            <div className="relative" style={{zIndex: 10}}>
                                <ProfileCard
                                    title={educationData[currentIndex].shortForm}
                                    subtitle={educationData[currentIndex].year}
                                    defaultImage={educationData[currentIndex].defaultImage}
                                    hoverImage={educationData[currentIndex].hoverImage}
                                    width="180px"
                                    height="250px"
                                    mdWidth="220px"
                                    mdHeight="300px"
                                    defaultImgWidth={educationData[currentIndex].defaultImgWidth}
                                    defaultImgHeight={educationData[currentIndex].defaultImgHeight}
                                    hoverImgWidth={educationData[currentIndex].hoverImgWidth}
                                    hoverImgHeight={educationData[currentIndex].hoverImgHeight}
                                    showBorder={false}
                                    showRounded={false}
                                />
                            </div>
                        </div>

                        {/* Education Details - More compact on mobile */}
                        <div className="flex-1 max-w-sm text-center md:text-left px-2 sm:px-0">
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                                    {educationData[currentIndex].institution}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
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
