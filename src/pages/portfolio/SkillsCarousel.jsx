import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../data/skillsData";

const allSkills = Object.entries(skillsData).flatMap(([category, skills]) =>
    skills.map((skill) => ({ ...skill, category }))
);

const SkillsCarousel = ({ onToggleView }) => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            const ul = carouselRef.current;
            if (!ul.nextSibling || ul.nextSibling.getAttribute('aria-hidden') !== 'true') {
                ul.insertAdjacentHTML('afterend', ul.outerHTML);
                ul.nextSibling.setAttribute('aria-hidden', 'true');
            }
        }
    }, []);

    const handleCarouselSkillClick = (skill) => {
        setSelectedSkill({ ...skill, originalX: 0, originalY: 0 });
    };

    const handleClose = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setSelectedSkill(null);
            setIsTransitioning(false);
        }, 300);
    };

    const handleSkillsHeadingClick = () => {
        console.log('Carousel heading clicked!'); // Debug log
        if (onToggleView) {
            console.log('Calling onToggleView from carousel'); // Debug log
            onToggleView();
        } else {
            console.log('onToggleView is not defined in carousel'); // Debug log
        }
    };

    // Split skills into two rows for carousel
    const midPoint = Math.ceil(allSkills.length / 2);
    const firstRowSkills = allSkills.slice(0, midPoint);
    const secondRowSkills = allSkills.slice(midPoint);

    return (
        <>
            <motion.div
                className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 md:py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
            >
                {/* First Row Carousel */}
                <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mb-8 md:mb-16">
                    <ul
                        ref={carouselRef}
                        className="flex items-center justify-center md:justify-start [&_li]:mx-3 md:[&_li]:mx-6 animate-infinite-scroll"
                    >
                        {firstRowSkills.map((skill, index) => (
                            <li key={`first-${skill.name}-${index}`}>
                                <motion.div
                                    onClick={() => handleCarouselSkillClick(skill)}
                                    className="group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.1)] group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                    </div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {skill.name}
                                    </div>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Centered SKILLS Heading with More Spacing */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-pointer hover:drop-shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-300 mb-12 md:mb-20 mt-8 md:mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleSkillsHeadingClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    SKILLS
                </motion.h1>

                {/* Second Row Carousel (Reverse Direction) */}
                <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-3 md:[&_li]:mx-6 animate-infinite-scroll-reverse">
                        {secondRowSkills.map((skill, index) => (
                            <li key={`second-${skill.name}-${index}`}>
                                <motion.div
                                    onClick={() => handleCarouselSkillClick(skill)}
                                    className="group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.1)] group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                    </div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {skill.name}
                                    </div>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-3 md:[&_li]:mx-6 animate-infinite-scroll-reverse" aria-hidden="true">
                        {secondRowSkills.map((skill, index) => (
                            <li key={`second-duplicate-${skill.name}-${index}`}>
                                <motion.div
                                    onClick={() => handleCarouselSkillClick(skill)}
                                    className="group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.1)] group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                    </div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {skill.name}
                                    </div>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Selected Skill Card - Enhanced Glassy Design */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={handleClose}
                        />
                        {/* Card */}
                        <motion.div
                            className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_20px_60px_rgba(255,255,255,0.1)] text-white text-center max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{
                                scale: 0.5,
                                opacity: 0,
                                y: 50
                            }}
                            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                        >
                            {/* Glassy overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />
                            {/* Content */}
                            <div className="relative z-10">
                                <motion.img
                                    src={selectedSkill.icon}
                                    alt={selectedSkill.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 mx-auto filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [1, 0.6, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    {selectedSkill.name}
                                </h2>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm opacity-90 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
                                        Category: <span className="font-semibold">{selectedSkill.category}</span>
                                    </p>
                                    <p className="text-sm opacity-90 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
                                        <span className="font-semibold">{selectedSkill.experience}</span> Experience
                                    </p>
                                    <div className="text-sm opacity-90 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/20">
                                        <span className="font-semibold">Projects:</span>
                                        <div className="mt-1 flex flex-wrap gap-1 justify-center">
                                            {selectedSkill.projects.map((project, index) => (
                                                <span key={index} className="bg-white/20 rounded-full px-2 py-1 text-xs">
                                                    {project}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm opacity-85 leading-relaxed bg-white/5 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10 text-left">
                                        {selectedSkill.description}
                                    </p>
                                </div>
                                <motion.button
                                    className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
                                    onClick={handleClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                @keyframes infinite-scroll-reverse {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 25s linear infinite;
                }
                .animate-infinite-scroll-reverse {
                    animation: infinite-scroll-reverse 25s linear infinite;
                }
            `}</style>
        </>
    );
};

export default SkillsCarousel;