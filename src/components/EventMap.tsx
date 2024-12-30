"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface EventMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export function EventMap({ latitude, longitude, address }: EventMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 14,
    });

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${address}</p>`))
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, address]);

  return <div ref={mapContainer} className="h-[400px] rounded-lg" />;
}
