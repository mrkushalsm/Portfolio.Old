import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmailDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    if (!email) {
        return <div className="text-center text-xl">No email selected.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
            <div className="card bg-base-100 shadow-xl p-6 max-w-2xl w-full">
                <h2 className="text-2xl font-bold">{email.subject}</h2>
                <p className="text-gray-500">From: {email.sender}</p>
                <p className="mt-4 text-lg">{email.body}</p>

                {/* Show 'View My Profile' button only for email ID 1 */}
                {email.id === 1 && (
                    <button
                        onClick={() => navigate("/boot", { state: { redirectTo: "/desktop" } })} // Redirects to DesktopEnv
                        className="btn btn-primary mt-4"
                    >
                        View My Profile
                    </button>
                )}

            </div>
        </div>
    );
};

export default EmailDetail;
