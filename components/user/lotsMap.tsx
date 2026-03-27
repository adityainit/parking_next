"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// same icon fix as mapSelector
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// custom green P marker like in your screenshot
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

type Lot = {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
}

interface LotsMapProps {
  lots: Lot[]
}

export const LotsMap = ({ lots }: LotsMapProps) => {
  const DEFAULT_LAT = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LAT!)
  const DEFAULT_LON = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LON!)

  return (
    <div className="">
        <MapContainer
        className="h-[600px]"
        key="lots-map"
        center={[DEFAULT_LAT, DEFAULT_LON]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}
        >
        <TileLayer
            attribution="&copy; Google Maps"
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        {lots.map((lot) => (
            <Marker
            key={lot.id}
            position={[lot.latitude, lot.longitude]}
            icon={parkingIcon}
            >
            <Popup>
                <div className="space-y-1">
                <p className="font-semibold">{lot.name}</p>
                <p className="text-sm text-stone-600">{lot.address}</p>
                <a href={`https://www.google.com/maps?q=${lot.latitude},${lot.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-600 font-semibold flex items-center gap-1 hover:underline"
              >
                Open in Google Maps ↗
              </a>
                </div>
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    </div>)
}