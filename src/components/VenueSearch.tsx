"use client";

import { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";

interface VenueSearchProps {
  onLocationSelect: (location: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

export function VenueSearch({ onLocationSelect }: VenueSearchProps) {
  const geocoderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!geocoderContainerRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
      types: "address,poi",
      countries: "NG", // Single country code as string
      bbox: [7.4, 4.5, 8.4, 5.6],
      placeholder: "Search for venue in Akwa Ibom...",
      marker: false,
    });

    // Create a map instance just for the geocoder
    const map = new mapboxgl.Map({
      container: document.createElement("div"), // Temporary container
      style: "mapbox://styles/mapbox/streets-v12",
      center: [7.9, 5.0], // Center of Akwa Ibom
      zoom: 10,
    });

    // Add geocoder to the map
    map.addControl(geocoder);

    // Move the geocoder to our container
    geocoderContainerRef.current.appendChild(
      geocoderContainerRef.current.querySelector(".mapboxgl-ctrl-geocoder") ||
        document.createElement("div")
    );

    geocoder.on("result", (event) => {
      const { result } = event;
      onLocationSelect({
        address: result.place_name,
        coordinates: {
          lat: result.center[1],
          lng: result.center[0],
        },
      });
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect]);

  return (
    <div>
      <div ref={geocoderContainerRef} className="venue-search-container" />
    </div>
  );
}
