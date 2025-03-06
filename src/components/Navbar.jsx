import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isInboxPage = location.pathname === "/inbox";
    const isRootPage = location.pathname === "/";
    const isEmailDetailPage = location.pathname.startsWith("/email");

    return (
        <div className="navbar flex items-center justify-between bg-base-200 p-4 relative">
            <div className="flex items-center">
                <svg
                    onClick={() => navigate("/")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary cursor-pointer"
                >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </div>
            <div className="flex items-center gap-4 relative">
                {isEmailDetailPage && (
                    <button onClick={() => navigate("/inbox")} className="btn btn-circle btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevrons-left"
                        >
                            <path d="m11 17-5-5 5-5" />
                            <path d="m18 17-5-5 5-5" />
                        </svg>
                    </button>
                )}

                {!isInboxPage && !isEmailDetailPage && (
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 animate-bounce">
                        <span className="text-3xl">➡️</span>
                    </div>
                )}

                {(isInboxPage || isRootPage) && (
                    <div className="tooltip tooltip-left" data-tip="Check your messages">
                        <Link to="/inbox" className="btn btn-primary flex items-center gap-2">
                            Inbox
                            <div className="badge badge-secondary">3</div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
