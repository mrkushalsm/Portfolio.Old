import React, { useState } from "react";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            name: "Weather App",
            description: "A real-time weather app using OpenWeather API.",
            image: "https://source.unsplash.com/300x200/?weather,app"
        },
        {
            name: "Portfolio Site",
            description: "A personal portfolio styled like a Windows desktop.",
            image: "https://source.unsplash.com/300x200/?portfolio,web"
        },
        {
            name: "Task Manager",
            description: "A simple task management app with drag-and-drop features.",
            image: "https://source.unsplash.com/300x200/?task,management"
        }
    ];

    return (
        <div className="p-4 text-white">
            <div className="space-y-3">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="p-3 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
                        onClick={() => setSelectedProject(project)}
                    >
                        <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-gray-300">{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Project Details Popup */}
            {selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-zinc-700/70">
                    <div className="bg-gray-900 p-6 m-6 rounded-lg shadow-lg max-w-lg">
                        <h2 className="text-xl font-bold">{selectedProject.name}</h2>
                        <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-48 object-cover rounded-lg my-3" />
                        <p className="text-gray-300">{selectedProject.description}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md cursor-pointer"
                            onClick={() => setSelectedProject(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
