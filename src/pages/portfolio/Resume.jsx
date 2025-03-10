import {motion} from "framer-motion";
import React from "react";

const Resume = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen py-10">
            <motion.h2
                className="text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                RESUME
            </motion.h2>
            <p className="text-gray-400 text-lg">Will come soon!</p>
        </div>
    );
};

export default Resume;
