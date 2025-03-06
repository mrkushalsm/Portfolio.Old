import React from "react";
import { useLocation } from "react-router-dom";

const EmailDetail = () => {
    const location = useLocation();
    const email = location.state?.email;

    if (!email) {
        return <div className="flex justify-center items-center p-6">Email not found.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-base-200 p-6">
            <div className="card bg-base-100 shadow-xl p-6 flex flex-col w-full max-w-lg">
                <h2 className="text-2xl font-bold">{email.subject}</h2>
                <p className="text-sm text-gray-500">From: {email.sender}</p>
                <p className="mt-4">{email.body}</p>
                {email.link && (
                    <a
                        href={email.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mt-4"
                    >
                        View Portfolio
                    </a>
                )}
            </div>
        </div>
    );
};

export default EmailDetail;
