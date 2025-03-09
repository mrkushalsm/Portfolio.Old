import React, { useEffect, useRef } from "react";
import HeroAnimation from "../../components/portfolio/HeroAnimation.jsx";
import AboutMe from "../windowsUI/AboutMe.jsx";
import Skills from "../windowsUI/Skills.jsx";
import Projects from "../windowsUI/Projects.jsx";

const sectionsData = [
    { id: 1, title: "About Me", content: <AboutMe />, direction: "left" }, // Now slides in from the left
    { id: 2, title: "Skills", content: <Skills />, direction: "right" }, // Now slides in from the right
    { id: 3, title: "Projects", content: <Projects />, direction: "left" }, // Now slides in from the right
];


const Portfolio = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "black");
        return () => {
            document.documentElement.removeAttribute("data-theme");
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-x-0");
                    }
                });
            },
            { threshold: 0.2 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 overflow-hidden">
            {/* Hero Section */}
            <HeroAnimation />

            {/* Dynamic Sections */}
            {sectionsData.map(({ id, title, content, direction }, index) => (
                <section
                    key={id}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className={`px-6 md:px-20 py-20 opacity-0 transition-all duration-700 ${
                        direction === "left" ? "-translate-x-32" : "translate-x-32"
                    }`}
                >
                    <h2 className="text-4xl font-bold">{title}</h2>
                    <div className="mt-4">{content}</div>
                </section>
            ))}

        </div>
    );
};

export default Portfolio;
