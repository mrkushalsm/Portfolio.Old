import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CertificateCarousel = ({ certificates }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        if (carouselRef.current) {
            setCanScrollLeft(carouselRef.current.scrollLeft > 0);
            setCanScrollRight(
                carouselRef.current.scrollLeft <
                carouselRef.current.scrollWidth - carouselRef.current.clientWidth
            );
        }
    };

    useEffect(() => {
        updateScrollState();
        carouselRef.current?.addEventListener("scroll", updateScrollState);
        return () =>
            carouselRef.current?.removeEventListener("scroll", updateScrollState);
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 400;
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            {/* Left Arrow */}
            <button
                className={`absolute left-[-90px] top-1/2 -translate-y-1/2 bg-gray-800/70 p-3 rounded-full hover:bg-gray-700 transition ${
                    canScrollLeft ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6"
                >
                    <path d="M15.3 4.3a1 1 0 0 1 0 1.4L10 11l5.3 5.3a1 1 0 0 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" />
                </svg>
            </button>

            {/* Scrollable Container */}
            <motion.div
                ref={carouselRef}
                className="flex gap-6 overflow-x-scroll  no-scrollbar scroll-smooth px-12"
                whileTap={{ cursor: "grabbing" }}
            >
                {certificates.map((cert, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-[#0A192F] rounded-lg shadow-lg overflow-hidden min-w-[450px] max-w-[450px] cursor-pointer"
                        whileHover={{ scale: 0.95 }}
                    >
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-5 text-white">
                            <h3 className="text-xl font-semibold">{cert.title}</h3>
                            <p className="text-sm text-gray-400">{cert.organization}</p>
                            <p className="text-xs text-gray-500">{cert.date}</p>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm"
                            >
                                View Certificate →
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Right Arrow */}
            <button
                className={`absolute right-[-130px] top-1/2 -translate-y-1/2 bg-gray-800/70 p-3 rounded-full hover:bg-gray-700 transition ${
                    canScrollRight ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6"
                >
                    <path d="M8.7 19.7a1 1 0 0 1 0-1.4L14 13l-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" />
                </svg>
            </button>
        </div>
    );
};

export default CertificateCarousel;
