import React, { useState, useEffect } from "react";

const ProfileCard = ({
    title,
    subtitle,
    defaultImage,
    hoverImage,
    backgroundImage = "/assets/profilecardhover.png",
    width,
    height,
    mdWidth,
    mdHeight,
    defaultImgWidth = "w-46",
    defaultImgHeight = "h-60",
    hoverImgWidth = "w-60",
    hoverImgHeight = "h-80",
    showBorder = true,
    showRounded = true
}) => {
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
                className="relative flex justify-center items-end perspective-3d group select-none"
                style={{
                    width: width,
                    height: height,
                    '@media (min-width: 768px)': {
                        width: mdWidth,
                        height: mdHeight
                    }
                }}
                onMouseEnter={() => isDesktop && setIsHovered(true)}
                onMouseLeave={() => isDesktop && setIsHovered(false)}
            >
                {/* Background Image */}
                <div className={`absolute w-full h-full transition-transform duration-500
                    ${isHovered ? "rotate-x-[25deg] -translate-y-2 shadow-2xl" : ""}
                `}>
                    <img
                        src={backgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Name or Title */}
                <div className={`absolute bottom-3 w-[80%] transition-transform duration-500
                    ${isHovered ? "-translate-y-[30px] scale-110" : ""}
                `}>
                    <h3 className="text-xl md:text-3xl font-semibold mt-4">{title}</h3>
                    <p className="text-sm md:text-base text-gray-400">{subtitle}</p>
                </div>

                {/* Crossfade Images */}
                <div className={`absolute bottom-23 w-full transition-all duration-500 ${isHovered ? "-translate-y-[30px]" : ""}`}>
                    <div className="relative w-full h-full flex justify-center items-center">
                        {/* Base Image (default image) */}
                        {isDesktop && (
                            <img
                                src={defaultImage}
                                alt="Default"
                                className={`absolute ${showRounded ? "rounded-full" : ""} ${showBorder ? "border-4 border-zinc-300" : ""} transition-opacity duration-500 ${defaultImgWidth} ${defaultImgHeight}
                                    ${isHovered ? "opacity-0" : "opacity-100"}
                                `}
                            />
                        )}

                        {/* Hover/Primary Image */}
                        <img
                            src={hoverImage}
                            alt="Primary"
                            className={`${showRounded ? "rounded-full" : ""} ${showBorder ? "border-4 border-zinc-300" : ""} transition-all duration-500 
                                ${isHovered ? `${hoverImgWidth} ${hoverImgHeight} -translate-y-[30px]` : `${defaultImgWidth} ${defaultImgHeight}`}
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
