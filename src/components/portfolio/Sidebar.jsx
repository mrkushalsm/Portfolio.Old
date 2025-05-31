import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaProjectDiagram,
    FaCode,
    FaImage,
    FaFile,
    FaBlog
} from "react-icons/fa";
import "animate.css";

const Sidebar = ({ sections }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 1600);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2; // Mid-screen reference

            sections.forEach(({ id }) => {
                const section = document.getElementById(id);
                if (section) {
                    const { top, bottom } = section.getBoundingClientRect();
                    const sectionTop = window.scrollY + top;
                    const sectionBottom = window.scrollY + bottom;

                    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                        setActiveSection(id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const icons = {
        AboutMe: <FaUser />,
        Skills: <FaCode />,
        Projects: <FaProjectDiagram />,
        Certificates: <FaImage />,
        Resume: <FaFile />,
        Blogs: <FaBlog />,
    };

    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const yOffset = -80; // Adjusted for smooth positioning
            const y = section.getBoundingClientRect().top + window.scrollY - yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div
            className={`fixed flex bg-base-300/20 p-3 rounded-full shadow-full z-50 pointer-events-auto
            ${isVisible ? "animate__animated animate__fadeInLeft" : "opacity-0"}
            md:transform md:-translate-y-1/2 md:flex-col md:space-y-6
            flex-row space-x-4 md:space-x-0 md:bg-y md:top-1/2 md:left-4 bottom-4 w-screen md:w-fit justify-center`}
        >
            {sections.map(({ id, title }) => (
                <button
                    key={id}
                    onClick={() => handleScroll(id)}
                    className={`tooltip tooltip-top md:tooltip-right btn btn-circle btn-neutral cursor-pointer transition-all duration-300 ${
                        activeSection === id ? "shadow-[0_0_15px_4px_rgba(255,255,255,0.9)] scale-110" : ""
                    }`}
                    data-tip={title}
                >
                    {icons[id] || <FaUser />}
                </button>
            ))}
        </div>
    );
};

export default Sidebar;