import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isInboxPage = location.pathname === "/inbox"; // Check if on Inbox page

    return (
        <div className="navbar bg-base-200 p-4 relative">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Email</a>
            </div>
            <div className="flex-none relative">
                {/* Render arrow ONLY if NOT on the Inbox page */}
                {!isInboxPage && (
                    <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 animate-bounce">
                        <span className="text-3xl">➡️</span>
                    </div>
                )}
                {/* Inbox button with badge */}
                <div className="tooltip tooltip-left" data-tip="Check your messages">
                    <Link to="/inbox" className="btn btn-primary rounded-xl">
                        Inbox
                        <div className="badge badge-secondary">3</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
