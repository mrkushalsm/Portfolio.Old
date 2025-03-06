import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inbox from "./pages/Inbox";
import EmailDetail from "./pages/EmailDetail";
import Portfolio from "./pages/Portfolio";

const Layout = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = location.pathname === "/portfolio" ? "Portfolio" : "Email";
    }, [location.pathname]);

    const hideNavbar = location.pathname === "/portfolio";

    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            {!hideNavbar && <Navbar />}
            <div className="flex-grow flex flex-col">{children}</div>
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
