"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error";

export default function CulturalSitesPage() {
  const culturalSites = [
    {
      id: 1,
      title: "Tori Heritage Museum",
      description:
        "Explore the rich history and cultural artifacts of Tori region.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736243251/torimuseum_zzesvt.jpg",
      location: "Central Tori",
      openingHours: "9:00 AM - 5:00 PM",
      entryFee: "Free",
    },
    {
      id: 2,
      title: "Ancient Temple Complex",
      description:
        "A beautiful 12th-century temple showcasing traditional architecture.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736243447/temple_ogspyt.jpg",
      location: "North Tori",
      openingHours: "6:00 AM - 8:00 PM",
      entryFee: "$5",
    },
    // Add more sites as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Cultural Sites
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{site.title}</h3>
                <p className="text-gray-600 mb-4">{site.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 Location: {site.location}</p>
                  <p>🕒 Hours: {site.openingHours}</p>
                  <p>💰 Entry: {site.entryFee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
