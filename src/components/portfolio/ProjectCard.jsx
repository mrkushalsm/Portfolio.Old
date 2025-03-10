import React from "react";

const ProjectCard = ({ project }) => {
    return (
        <a
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-5 bg-gray-800/20 shadow-lg rounded-xl transition-transform duration-500 hover:scale-90"
        >
            {/* Project Image */}
            <img
                src={project.image}
                alt={project.name}
                className="w-full h-100 object-cover rounded-lg"
            />

            {/* Project Name */}
            <h3 className="text-xl font-bold text-center mt-3 uppercase tracking-wide text-white transition-all duration-300 hover:text-primary">
                {project.name}
            </h3>

            {/* Project Description */}
            <p className="text-gray-400 text-center text-sm mt-1">
                {project.description}
            </p>
        </a>
    );
};

export default ProjectCard;
