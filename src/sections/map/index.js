import { MyLocation } from "@/components/MyLocation";
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const ReportMap = () => {
  return (
    <MapContainer
      center={[16.0471688, 108.206706]}
      zoom={10}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyLocation />
      <ListMarker />
    </MapContainer>
  );
};

const ListMarker = () => {
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  console.log(zoomLevel);

  return null;
};

export default ReportMap;
