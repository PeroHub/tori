"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  className?: string;
}

export function Map({ location, className = "h-[400px]" }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.coordinates.lng, location.coordinates.lat],
      zoom: 14,
    });

    marker.current = new mapboxgl.Marker()
      .setLngLat([location.coordinates.lng, location.coordinates.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<p class="font-semibold">${location.address}</p>`
        )
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location]);

  return <div ref={mapContainer} className={className} />;
}
