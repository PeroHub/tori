"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { Navigation } from "./Navigation";

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dywd8r6rd/video/upload/v1735575874/Sights_of_Akwa_Ibom_gfnmyu.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video fails to load */}
          <img
            src="https://i0.wp.com/www.nigeriagalleria.com/Nigeria/States_Nigeria/Akwa-Ibom/Images/Ibom-Plaza-Uyo.jpg"
            alt="Akwa Ibom"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        {/* Video Controls */}
        {/* <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button> */}
      </div>

      {/* Navigation */}
      {/* <Navigation />9 */}

      {/* Weather Widget */}
      <div className="relative z-10 w-full bg-black/20 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center text-sm">
          <span>Uyo: 28°C</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex items-center px-4">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-8"
          >
            Land of Promise and Culture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 px-4"
          >
            Discover extraordinary experiences in one of Nigeria's most
            beautiful states
          </motion.p>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            {[
              { title: "Cultural Sites", href: "/cultural-sites" },
              { title: "Beaches", href: "/beaches" },
              { title: "Local Cuisine", href: "/cuisine" },
              { title: "Festivals", href: "/festivals" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 sm:p-4 rounded-lg transition text-sm sm:text-base"
              >
                {item.title}
              </Link>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto px-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Where would you like to go in Akwa Ibom?"
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 pb-8 text-center"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto animate-bounce" />
      </motion.div>
    </div>
  );
}
