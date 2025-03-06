import React from "react";
import { Link } from "react-router-dom";

const emails = [
    {
        id: 1,
        subject: "📂 My Portfolio",
        sender: "Me",
        preview: "Check out my work!",
        body: "Hello, check out my portfolio!",
        link: "/portfolio"
    },
    {
        id: 2,
        subject: "📩 Job Opportunity",
        sender: "HR",
        preview: "We have an offer for you...",
        body: "We are interested in hiring you. Please reply for more details."
    },
    {
        id: 3,
        subject: "👋 Networking",
        sender: "Jane Doe",
        preview: "Let’s connect!",
        body: "Hi! I would love to connect and discuss opportunities." },
];

const Inbox = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200 p-6 gap-8">
            <h2 className="flex text-xl font-semibold">Welcome mrkushalsm!</h2>
            <h1 className="flex text-3xl font-bold mb-4">Inbox</h1>
            <div className=" flex card bg-base-100 shadow-xl p-4">
                <ul className=" flex menu w-full text-xl gap-8">
                    {emails.map((email) => (
                        <li key={email.id}>
                            <Link to="/email" state={{ email }}>
                                <strong className="p-3">{email.subject}</strong>
                                <span className="text-base text-gray-500"> - {email.sender}</span>
                                <p className="text-lg">{email.preview}</p>
                                <p />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Inbox;
