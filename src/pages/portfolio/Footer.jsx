import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6"; // Import Icons

const Footer = () => {
    return (
        <footer className="relative z-10 w-full py-6 text-center text-gray-400 bg-transparent">
            <div className="flex justify-center space-x-6">
                <a href="https://github.com/mrkushalsm" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-2xl transition-colors duration-300 hover:text-white" />
                </a>
                <a href="https://x.com/kspiderman69" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="text-2xl transition-colors duration-300 hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/mrkushalsm/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-2xl transition-colors duration-300 hover:text-white" />
                </a>
                <a href="mailto:mrkushalsm@gmail.com">
                    <FaEnvelope className="text-2xl transition-colors duration-300 hover:text-white" />
                </a>
            </div>
            <p className="mt-3 text-sm text-gray-500">© {new Date().getFullYear()} Kushal Sonnad Math. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
