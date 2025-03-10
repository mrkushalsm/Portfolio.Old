import React from "react";
import { Link } from "react-router-dom";

const emails = [
    {
        id: 1,
        subject: "📂 My Portfolio",
        sender: "Kushal SM",
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
        body: "Hi! I would love to connect and discuss opportunities."
    },
    {
        "id": 4,
        "subject": "🔥 Exciting Project Collaboration",
        "sender": "Tech Startup",
        "preview": "We'd love to work with you!",
        "body": "Hello, we came across your portfolio and are interested in collaborating on an upcoming project."
    },
    {
        "id": 5,
        "subject": "🎓 Free Online Course",
        "sender": "CodeAcademy",
        "preview": "Enroll now for free!",
        "body": "We are offering a free advanced JavaScript course for a limited time. Sign up today!"
    },
    {
        "id": 6,
        "subject": "💳 Payment Received",
        "sender": "PayPal",
        "preview": "Your payment has been processed.",
        "body": "You have successfully received a payment of $500.00. Transaction ID: 123456789."
    },
    {
        "id": 7,
        "subject": "🚀 Your Website is Live!",
        "sender": "Hosting Provider",
        "preview": "Your domain is now active.",
        "body": "Congratulations! Your website is now live on www.yoursite.com."
    },
    {
        "id": 8,
        "subject": "📢 Important Security Update",
        "sender": "Google",
        "preview": "Please update your security settings.",
        "body": "We've detected unusual login activity on your account. Please review your security settings."
    },
    {
        "id": 9,
        "subject": "🛒 Order Confirmation",
        "sender": "Amazon",
        "preview": "Your order has been placed.",
        "body": "Your order #987654 has been confirmed. Estimated delivery: 3-5 business days."
    },
    {
        "id": 10,
        "subject": "📆 Meeting Reminder",
        "sender": "Zoom",
        "preview": "Your meeting starts in 30 minutes.",
        "body": "Reminder: You have a meeting scheduled at 2:00 PM. Click here to join."
    },
    {
        "id": 11,
        "subject": "🎉 Congratulations! You Won!",
        "sender": "Giveaway Team",
        "preview": "Claim your prize now!",
        "body": "You’ve won our giveaway! Click here to claim your free gift."
    },
    {
        "id": 12,
        "subject": "💼 New Internship Available",
        "sender": "LinkedIn",
        "preview": "A perfect role for you!",
        "body": "We found an internship that matches your skills. Apply now before it’s gone!"
    },
    {
        "id": 13,
        "subject": "🔔 Subscription Renewal Notice",
        "sender": "Netflix",
        "preview": "Your subscription is about to renew.",
        "body": "Your Netflix subscription will be renewed on March 15, 2025. No action is needed."
    },
];

const Inbox = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200 p-6 gap-8">
            <h2 className="flex text-xl font-semibold">Welcome mrkushalsm!</h2>
            <h1 className="flex text-3xl font-bold mb-4">Inbox</h1>
            <div className=" flex card bg-base-100 shadow-xl p-4">
                <ul className=" flex menu w-full text-xl gap-8">
                    {emails.map((email) => (
                        <li key={email.id} className={email.id === 1 ? "" : "opacity-25"}>
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
