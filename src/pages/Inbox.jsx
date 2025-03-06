import React from "react";
import { Link } from "react-router-dom";

const emails = [
    { id: 1, subject: "📂 My Portfolio", sender: "Me", preview: "Check out my work!", body: "Hello, check out my portfolio!", link: "/portfolio" },
    { id: 2, subject: "📩 Job Opportunity", sender: "HR", preview: "We have an offer for you...", body: "We are interested in hiring you. Please reply for more details." },
    { id: 3, subject: "👋 Networking", sender: "Jane Doe", preview: "Let’s connect!", body: "Hi! I would love to connect and discuss opportunities." },
];

const Inbox = () => {
    return (
        <div className="min-h-screen bg-base-200 p-6">
            <h1 className="text-3xl font-bold mb-4">Inbox</h1>
            <div className="card bg-base-100 shadow-xl p-4">
                <ul className="menu">
                    {emails.map((email) => (
                        <li key={email.id}>
                            <Link to="/email" state={{ email }}>
                                <strong>{email.subject}</strong>
                                <span className="text-xs text-gray-500"> - {email.sender}</span>
                                <p className="text-sm">{email.preview}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Inbox;
