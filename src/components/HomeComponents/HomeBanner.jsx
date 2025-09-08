import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sign from "../../assets/signs.png";
import space from "../../assets/space.jpg";

export default function HomeBanner() {
  const [angle, setAngle] = useState(0);

  // Animate the zodiac sign clockwise (fan effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360); // keep between 0–359
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Background */}
      <img
        src={space}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Navigation Arrows */}
      <button className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full z-10">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full z-10">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-12">
        {/* Left text */}
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Explore Your Zodiac</h1>
          <p className="text-lg text-gray-200">
            Discover astrology insights, planetary movements, and your personal
            horoscope.
          </p>
        </div>

        {/* Right rotating sign (fan-like) */}
        <div className="relative w-[400px] h-[400px] flex items-center justify-center">
          <img
            src={sign}
            alt="zodiac sign"
            className="w-[350px] h-[350px]"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "center center", // spin around its center
            }}
          />
        </div>
      </div>
    </div>
  );
}
