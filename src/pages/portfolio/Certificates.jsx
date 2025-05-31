import CertificateCarousel from "../../components/portfolio/CertificateCarousel";
import certificateData from "../../data/certificateData";
import {motion} from "framer-motion";
import React from "react";

const Certificates = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 sm:py-10 px-4 sm:px-6">
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] uppercase text-center mb-8 sm:mb-12 md:mb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                CERTIFICATES
            </motion.h2>
            <div className="w-full max-w-6xl">
                <CertificateCarousel certificates={certificateData} />
            </div>
        </div>
    );
};

export default Certificates;