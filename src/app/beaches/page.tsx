"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";

export default function BeachesPage() {
  const beaches = [
    {
      id: 1,
      title: "Tori Beach Paradise",
      description:
        "Crystal clear waters and white sandy beaches perfect for swimming.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736244358/toris_ocjyfe.jpg",
      location: "South Tori",
      activities: ["Swimming", "Snorkeling", "Sunbathing"],
      facilities: ["Restrooms", "Showers", "Parking"],
    },
    {
      id: 2,
      title: "Sunset Bay",
      description: "Famous for its stunning sunsets and peaceful atmosphere.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736244608/sunset_vh8oz6.jpg",
      location: "West Tori",
      activities: ["Surfing", "Beach Volleyball", "Fishing"],
      facilities: ["Beach Chairs", "Restaurants", "Water Sports"],
    },
    // Add more beaches as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Beaches</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beaches.map((beach) => (
            <div
              key={beach.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={beach.image}
                  alt={beach.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{beach.title}</h3>
                <p className="text-gray-600 mb-4">{beach.description}</p>
                <div className="space-y-2">
                  <p className="text-gray-500">📍 {beach.location}</p>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Activities:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {beach.activities.map((activity) => (
                        <span
                          key={activity}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
