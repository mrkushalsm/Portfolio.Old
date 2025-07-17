import React, { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { name: "English", proficiency: 95, translatedTitle: "I am Kushal, nice to meet you" },
  { name: "Kannada", proficiency: 75, translatedTitle: "ನಾನು ಕುಶಾಲ್, ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು." },
  { name: "Hindi", proficiency: 65, translatedTitle: "मैं कुशल हूँ, आपसे मिलकर खुशी हुई।" },
  { name: "Japanese", proficiency: 30, translatedTitle: "私はクシャルです。初めまして" },
  { name: "Telugu", proficiency: 20, translatedTitle: "నేను కుశాల్ ని, మిమ్మల్ని కలవడం ఆనందంగా ఉంది." },
];

const LONG_PRESS_DURATION = 400; // ms

function useTypewriter(text, speed = 40, resetKey = "") {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);

  useEffect(() => {
    // Reset everything when dependencies change
    index.current = 0;
    setDisplayed("");

    if (!text) return;

    const intervalId = setInterval(() => {
      // Use the ref for the current index
      const currentIndex = index.current;

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
        return;
      }

      // Use Array.from for Unicode safety and slice to build the string
      setDisplayed(Array.from(text).slice(0, currentIndex + 1).join(""));
      index.current += 1;

    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, resetKey]);

  return displayed;
}

const SpokenLanguages = () => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const longPressTimeout = useRef();
  const [typewriterKey, setTypewriterKey] = useState(0);

  // Mobile long-press handlers
  const handleTouchStart = (idx) => {
    longPressTimeout.current = setTimeout(() => {
      setHovered(idx);
    }, LONG_PRESS_DURATION);
  };
  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
    setHovered(null);
  };

  // Typewriter logic
  const heading = selected === null ? "Languages I know" : LANGUAGES[selected]?.translatedTitle;
  const typewriterText = useTypewriter(heading, 50, typewriterKey + heading);

  // When selected changes, reset typewriter
  useEffect(() => {
    setTypewriterKey((k) => k + 1);
  }, [selected]);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-10 text-center uppercase min-h-[2.5em]">
        {typewriterText}
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {LANGUAGES.map((lang, idx) => (
          <div
            key={lang.name}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => handleTouchStart(idx)}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 border-white focus:outline-none
                bg-gradient-to-b from-white/20 via-black/80 to-black/90 text-white
                shadow-md hover:from-white/40 hover:to-black/100
                ${selected === idx ? "ring-2 ring-white" : ""} cursor-pointer`}
              onClick={() => setSelected(idx)}
              type="button"
            >
              <span className="cursor-pointer w-full h-full block">{lang.name}</span>
            </button>
            {/* Popup proficiency bar */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${hovered === idx ? "opacity-100 translate-y-2" : "opacity-0 pointer-events-none -translate-y-0"}`}
              style={{ minWidth: 120, zIndex: 20 }}
            >
              <div className="bg-black/90 border border-white rounded-lg shadow-lg px-4 py-2 flex flex-col items-center animate-slideInDown">
                <span className="text-xs text-white mb-1">Proficiency</span>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
                <span className="text-xs text-gray-300 mt-1">{lang.proficiency}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slide in animation keyframes */}
      <style>{`
        .animate-slideInDown {
          animation: slideInDown 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SpokenLanguages;
