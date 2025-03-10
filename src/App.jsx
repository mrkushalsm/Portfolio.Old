import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Inbox from "./pages/Inbox";
import EmailDetail from "./pages/EmailDetail";
import BootScreen from "./pages/BootScreen";
import DesktopEnv from "./pages/windowsUI/Desktop.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";

const Hero = () => {
    return (
        <div className="hero bg-base-200/50 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there!</h1>
                    <p className="py-6">
                        Looks like you have a new mail awaiting for you! Click on the button pointed by an arrow to check it out.
                    </p>
                </div>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showHero, setShowHero] = useState(true);

    useEffect(() => {
        // Define tab titles and icons for each page
        const pageSettings = {
            "/inbox": { title: "Inbox", icon: "/icons/inbox.ico" },
            "/email": { title: "Email", icon: "/icons/email.ico" },
            "/portfolio": { title: "Portfolio", icon: "/icons/portfolio.ico" },
            "/desktop": { title: "Desktop", icon: "/icons/desktop.ico" },
            "/boot": { title: "Boot", icon: "/icons/boot.ico" },
        };

        // Get the current page settings or set default values
        const { title, icon } = pageSettings[location.pathname] || {
            title: "Email",
            icon: "/icons/email.ico",
        };

        // Change the document title
        document.title = title;

        // Change the favicon
        const link = document.querySelector("link[rel='icon']") || document.createElement("link");
        link.rel = "icon";
        link.href = icon;
        document.head.appendChild(link);

    }, [location]);

    const hideNavbar = location.pathname === "/desktop" || location.pathname === "/portfolio"; // ✅ Hides Navbar on `/portfolio`

    const handleInboxClick = () => {
        setShowHero(false);
        navigate("/inbox");
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            {!hideNavbar && <Navbar onInboxClick={handleInboxClick} />}
            {showHero && location.pathname === "/" && <Hero />}
            <div className="flex-grow flex flex-col">{children}</div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/boot" element={<BootScreen />} />

                <Route
                    path="/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/inbox" element={<Inbox />} />
                                <Route path="/email" element={<EmailDetail />} />
                                <Route path="/desktop" element={<DesktopEnv />} />
                                <Route path="/portfolio" element={<Portfolio />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
