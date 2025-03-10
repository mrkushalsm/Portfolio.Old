import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import HeroAnimation from "../../components/portfolio/HeroAnimation.jsx";
import AboutMe from "../portfolio/AboutMe.jsx";
import Skills from "../portfolio/Skills.jsx";
import Projects from "../portfolio/Projects.jsx";
import Certificates from "../portfolio/Certificates.jsx";
import Resume from "../portfolio/Resume.jsx";
import Blogs from "../portfolio/Blogs.jsx";
import Sidebar from "../../components/portfolio/Sidebar.jsx";
import Background from "../../components/portfolio/Background.jsx";
import Footer from "../portfolio/Footer.jsx"; // Import Footer

const sectionsData = [
    { id: "AboutMe", title: "About Me", content: <AboutMe />, direction: null },
    { id: "Skills", title: "Skills", content: <Skills />, direction: "right" },
    { id: "Projects", title: "Projects", content: <Projects />, direction: "left" },
    { id: "Certificates", title: "Certificates", content: <Certificates />, direction: "right" },
    { id: "Resume", title: "Resume", content: <Resume />, direction: "left" },
    { id: "Blogs", title: "Blogs", content: <Blogs />, direction: "right" },
];

const Portfolio = () => {
    const sectionsRef = useRef([]);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }, 100);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setSidebarVisible(true), 1500);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const { direction } = entry.target.dataset;
                        entry.target.classList.add(
                            "animate__animated",
                            direction === "right" ? "animate__fadeInRight" : "animate__fadeInLeft"
                        );
                        entry.target.classList.remove("opacity-0");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-base-200/50" data-theme="dark">
            {/* Background */}
            <div className="fixed inset-0 w-full h-full">
                <Background />
            </div>

            {/* Hero Section */}
            <HeroAnimation />

            {/* Sidebar */}
            {isSidebarVisible && <Sidebar sections={sectionsData} />}

            {/* Sections */}
            {sectionsData.map(({ id, content, direction }, index) => (
                <section
                    key={id}
                    id={id}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    data-direction={direction}
                    className={`relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 transition-all duration-700 ${
                        direction ? "opacity-100" : ""
                    }`}
                >
                    <div className="mt-4">{content}</div>
                </section>
            ))}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Portfolio;
