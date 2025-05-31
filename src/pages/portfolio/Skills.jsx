import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "../../data/skillsData";

const allSkills = Object.entries(skillsData).flatMap(([category, skills]) =>
    skills.map((skill) => ({ ...skill, category }))
);

const Skills = ({ onToggleView }) => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [angle, setAngle] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAngle((prev) => prev + 0.02);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const getSkillPosition = (index) => {
        const radius = 450;
        const angleOffset = (index / allSkills.length) * Math.PI * 2;
        const x = Math.cos(angle + angleOffset) * radius;
        const y = Math.sin(angle + angleOffset) * radius;
        return { x, y };
    };

    const handleSelectSkill = (skill, index) => {
        if (selectedSkill || isTransitioning) return;
        const { x, y } = getSkillPosition(index);
        setSelectedSkill({ ...skill, index, originalX: x, originalY: y });
    };

    const handleClose = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setSelectedSkill(null);
            setIsTransitioning(false);
        }, 300);
    };

    const handleSkillsHeadingClick = () => {
        console.log('Skills heading clicked!'); // Debug log
        if (onToggleView) {
            console.log('Calling onToggleView'); // Debug log
            onToggleView();
        } else {
            console.log('onToggleView is not defined'); // Debug log
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
            {/* Glowing SKILLS heading - clickable */}
            <AnimatePresence>
                {!selectedSkill && (
                    <motion.h1
                        className="absolute text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-pointer hover:drop-shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={handleSkillsHeadingClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        SKILLS
                    </motion.h1>
                )}
            </AnimatePresence>

            {/* Rotating Skill Icons */}
            {allSkills.map((skill, index) => {
                const { x, y } = getSkillPosition(index);
                const isSelected = selectedSkill?.name === skill.name;
                return (
                    <motion.div
                        key={skill.name}
                        className="absolute w-20 h-20 cursor-pointer"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 1.4 }}
                        animate={
                            isSelected
                                ? { x: 0, y: 0, scale: 1.5 }
                                : { x, y, scale: 1, transition: { duration: 0.5 } }
                        }
                        onClick={() => handleSelectSkill(skill, index)}
                    >
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                    </motion.div>
                );
            })}

            {/* Selected Skill Card */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        className="flex flex-col items-center justify-center w-90 h-90 p-6 bg-gray-900 rounded-xl shadow-2xl text-white text-center z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{
                            scale: 0.5,
                            x: selectedSkill.originalX,
                            y: selectedSkill.originalY,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src={selectedSkill.icon}
                            alt={selectedSkill.name}
                            className="w-20 h-20 mb-4"
                            animate={{
                                y: [0, -10, 0], // Floating up & down
                                opacity: [1, 0.6, 1], // Flickering neon effect
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <h2 className="text-2xl font-bold">{selectedSkill.name}</h2>
                        <p className="text-sm opacity-80">Category: {selectedSkill.category}</p>
                        <p className="text-sm opacity-80">{selectedSkill.experience} Experience</p>
                        <p className="mt-2 text-sm">Projects: {selectedSkill.projects.join(", ")}</p>
                        <p className="mt-2 text-sm opacity-75">{selectedSkill.description}</p>
                        <motion.button
                            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded cursor-pointer"
                            onClick={handleClose}
                            whileTap={{ scale: 0.9 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Skills;