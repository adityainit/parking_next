"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const parkingIcon = new L.DivIcon({
  html: `<div style="
    background:#0f766e;
    color:white;
    width:32px;
    height:32px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    display:flex;
    align-items:center;
    justify-content:center;
  ">
    <span style="transform:rotate(45deg);font-weight:bold;font-size:14px;">P</span>
  </div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

interface SinglePinMapProps {
  latitude: number
  longitude: number
  name: string
  address: string
}

export const SinglePinMap = ({ latitude, longitude, name, address }: SinglePinMapProps) => {
  return (
    <div style={{ borderRadius: "0.5rem", overflow: "hidden" }}>
      <MapContainer
        key="single-pin-map"
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "420px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution="&copy; Google Maps"
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        <Marker position={[latitude, longitude]} icon={parkingIcon}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-stone-600">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}