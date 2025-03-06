import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inbox from "./pages/Inbox";
import EmailDetail from "./pages/EmailDetail";
import Portfolio from "./pages/Portfolio";

const Layout = ({ children }) => {
    const location = useLocation();

    // Determine title based on the current page
    useEffect(() => {
        if (location.pathname === "/portfolio") {
            document.title = "Portfolio";
        } else {
            document.title = "Email";
        }
    }, [location.pathname]);

    const hideNavbar = location.pathname === "/portfolio"; // Hide navbar on Portfolio page

    return (
        <div className="min-h-screen bg-base-200">
            {!hideNavbar && <Navbar />}
            {children}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/email" element={<EmailDetail />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
