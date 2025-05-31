import React, { useEffect, useState } from "react";
import anime from "animejs";

const HeroAnimation = () => {
    const [showMainContent, setShowMainContent] = useState(false);

    useEffect(() => {
        anime
            .timeline({})
            .add({
                targets: ".cover",
                height: ["60%", "200%"],
                top: ["-90%", "100%"],
                easing: "easeInOutCubic",
                duration: 1600,
            })
            .add({
                targets: ".loading-text span",
                translateX: ["-2rem", "0"],
                opacity: [0, 1],
                easing: "easeOutQuad",
                delay: anime.stagger(200),
                duration: 500,
            })
            .add({
                targets: ".loading-text",
                textShadow: ["0 0 1em transparent", "0 0 1em #ededed"],
                easing: "easeInOutQuad",
                duration: 800,
                offset: "+=500",
            })
            .add({
                targets: ".loading-wrapper",
                opacity: [1, 0],
                easing: "easeOutQuad",
                duration: 800,
                complete: () => {
                    setShowMainContent(true);
                    setTimeout(animateMainContent, 300); // Smooth transition
                },
            });
    }, []);

    const animateMainContent = () => {
        anime
            .timeline({})
            .add({
                targets: ".main-text span",
                translateY: ["1rem", "0"],
                opacity: [0, 1],
                easing: "easeOutExpo",
                delay: anime.stagger(80),
            })
            .add({
                targets: ".main-text",
                textShadow: ["0 0 1em transparent", "0 0 1em #ededed"],
                easing: "easeInOutQuad",
                duration: 800,
                offset: "+=500",
            })
            .add({
                targets: ".sub-text span",
                translateY: ["1rem", "0"],
                opacity: [0, 1],
                easing: "easeOutExpo",
                delay: anime.stagger(50),
            })
            .add({
                targets: ".sub-text",
                textShadow: ["0 0 1em transparent", "0 0 1em #ededed"],
                easing: "easeInOutQuad",
                duration: 800,
                offset: "+=500",
            });
    };

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-2">
            <div className="cover absolute bg-neutral w-full h-[60%] top-[-60%] z-10"></div>

            {/* Loading Animation Wrapper */}
            {!showMainContent && (
                <div className="loading-wrapper absolute flex flex-col items-center justify-center w-full h-full">
                    <h3 className="loading-text text-white text-6xl font-bold">
                        {["H", "i", "!"].map((char, i) => (
                            <span key={i} className="inline-block opacity-0 transform -translate-x-8 px-1">
                                {char}
                            </span>
                        ))}
                    </h3>
                </div>
            )}

            {/* Main Content (Revealed After Animation) */}
            {showMainContent && (
                <div className="main_content text-base-content text-center w-[70%] md:w-[80%]">
                    <h1 className="text-5xl md:text-6xl font-bold main-text">
                        {"Welcome      to      my      portfolio!".split("").map((char, i) => (
                            <span key={i} className="inline-block opacity-0 transform translate-y-4 px-1 p-3">
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
            )}
        </section>
    );
};

export default HeroAnimation;
