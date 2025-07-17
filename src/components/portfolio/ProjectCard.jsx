import React from "react";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project }) => {
    const handleCardClick = () => {
        if (project.link) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleGithubClick = (e) => {
        e.stopPropagation(); // Prevent card click when clicking GitHub button
        if (project.github) {
            window.open(project.github, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            className={`block w-full p-5 bg-gray-800/20 shadow-lg rounded-xl transition-transform duration-500 hover:scale-90 relative ${
                project.link ? 'cursor-pointer' : ''
            }`}
            onClick={handleCardClick}
        >
            {/* GitHub Button - Positioned absolutely in top-left corner */}
            {project.github && (
                <button
                    onClick={handleGithubClick}
                    className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300 z-10"
                >
                    <FaGithub className="w-4 h-4" />
                </button>
            )}

            {/* Project Image - Increased height for desktop */}
            <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 sm:h-60 md:h-80 lg:h-96 xl:h-[28rem] object-cover rounded-lg"
            />

            {/* Project Name - Always visible */}
            <h3 className="text-lg sm:text-xl font-bold text-center mt-3 uppercase tracking-wide text-white transition-all duration-300 hover:text-primary">
                {project.name}
            </h3>

            {/* Project Description - Always visible */}
            <p className="text-gray-400 text-center text-sm mt-1 mb-4 px-2">
                {project.description}
            </p>
        </div>
    );
};

export default ProjectCard;
