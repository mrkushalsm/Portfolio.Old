import React, { useState, useEffect } from "react";

const ProfileCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // Detect screen size for mobile vs desktop
    useEffect(() => {
        const checkIsDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        checkIsDesktop();
        window.addEventListener("resize", checkIsDesktop);
        return () => window.removeEventListener("resize", checkIsDesktop);
    }, []);

    return (
        <div className="text-center animate__animated animate__fadeInLeft justify-center">
            <div
                className="relative w-[250px] h-[350px] md:w-[300px] md:h-[400px] flex justify-center items-end perspective-3d group select-none"
                onMouseEnter={() => isDesktop && setIsHovered(true)}
                onMouseLeave={() => isDesktop && setIsHovered(false)}
            >
                {/* Background Image */}
                <div className={`absolute w-full h-full transition-transform duration-500
                    ${isHovered ? "rotate-x-[25deg] -translate-y-2 shadow-2xl" : ""}
                `}>
                    <img
                        src="/assets/profilecardhover.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Name or Title */}
                <div className={`absolute bottom-3 w-[80%] transition-transform duration-500
                    ${isHovered ? "-translate-y-[30px] scale-110" : ""}
                `}>
                    <h3 className="text-3xl font-semibold mt-4">Kushal SM</h3>
                    <p className="text-base text-gray-400">Full Stack Developer</p>
                </div>

                {/* Crossfade Images */}
                <div className={`absolute bottom-25 w-full transition-all duration-500 ${isHovered ? "-translate-y-[30px]" : ""}`}>
                    <div className="relative w-full h-full flex justify-center items-center">
                        {/* Base Image (profile-bw.jpg) */}
                        {isDesktop && (
                            <img
                                src="/assets/profile-bw.jpg"
                                alt="Profile Default"
                                className={`absolute rounded-full border-4 border-zinc-300 transition-opacity duration-500 w-53 h-70
                                    ${isHovered ? "opacity-0" : "opacity-100"}
                                `}
                            />
                        )}

                        {/* Hover/Primary Image (profile.jpeg) */}
                        <img
                            src="/assets/profile.jpeg"
                            alt="Profile"
                            className={`rounded-full border-4 border-zinc-300 transition-all duration-500 
                                ${isHovered ? "w-60 h-80 -translate-y-[30px]" : "w-53 h-70"}
                                ${isDesktop ? (isHovered ? "opacity-100" : "opacity-0") : "opacity-100"}
                            `}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
