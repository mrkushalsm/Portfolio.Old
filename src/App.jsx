import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BootScreen from "./pages/BootScreen";
import DesktopEnv from "./pages/windowsUI/Desktop";
import Portfolio from "./pages/portfolio/Portfolio";
import LandingPage from "./pages/LandingPage"; // New Landing Page Component

// PageWrapper component to handle useLocation inside Router
const PageWrapper = () => {
    const location = useLocation();

    useEffect(() => {
        const pageSettings = {
            "/portfolio": { title: "Portfolio", icon: "/icons/portfolio.ico" },
            "/desktop": { title: "Desktop", icon: "/icons/desktop.ico" },
            "/boot": { title: "Boot", icon: "/icons/boot.ico" },
        };

        const { title, icon } = pageSettings[location.pathname] || {
            title: "Welcome",
            icon: "/icons/star.png",
        };

        document.title = title;

        const link = document.querySelector("link[rel='icon']") || document.createElement("link");
        link.rel = "icon";
        link.href = icon;
        document.head.appendChild(link);
    }, [location]);

    return (
        <div className="h-screen w-screen bg-zinc-800">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/boot" element={<BootScreen />} />
                <Route path="/desktop" element={<DesktopEnv />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <PageWrapper />
        </Router>
    );
};

export default App;
