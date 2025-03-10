import React from "react";

const ProfileCard = () => {
    return (
        <div className="text-center animate__animated animate__fadeInLeft justify-center">
            <div className="relative w-[250px] h-[350px] md:w-[300px] md:h-[400px] flex justify-center items-end
            perspective-3d group">
                {/* Wrapper with 3D Hover Effect */}
                <div className="absolute w-full h-full transition-transform duration-500
                group-hover:rotate-x-[25deg] group-hover:-translate-y-2 group-hover:shadow-10xl">

                    {/* Background Image */}
                    <img src="/assets/profilecardhover.png" alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Name or Title (Appears on Hover) */}
                <div className="absolute bottom-3 w-[80%] transition-transform duration-500
                    group-hover:translate-y-[-30px] group-hover:scale-110">
                    <h3 className="text-3xl font-semibold mt-4">Kushal SM</h3>
                    <p className="text-base text-gray-400">Full Stack Developer</p>
                </div>

                {/* Character Overlay (Optional) */}
                <div className="absolute bottom-25 w-full opacity-100 transition-opacity duration-500 group-hover:translate-y-[-30px]">
                    <img
                        src="/assets/profile.jpeg"
                        alt="Profile"
                        className="w-53 h-70 rounded-full mx-auto border-4 border-zinc-300 transition-all duration-100 group-hover:w-60 group-hover:h-80 group-hover:translate-y-[-30px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;