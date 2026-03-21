"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { LeafletMouseEvent } from "leaflet"

import "leaflet/dist/leaflet.css";

// Fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export function MapSelector({ onLocationSelect }: MapSelectorProps) {
  const defaultPosition: [number, number] = [
    parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT!),
    parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON!)]; 
    // Parlakhemundi location

  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  function LocationMarker() {
    useMapEvents({
      click(e : LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationSelect(lat, lng);
      },
    });

    return <Marker position={position} />;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}