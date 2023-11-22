import { mapService } from "@/apis/map";
import { commonMarker } from "@/components/MapIcon";
import TicketPopup from "@/components/MapPopup/ticket-popup";
import { MyLocation } from "@/components/MyLocation";
import { MAP_ZOOM_DEFAULT, MAP_ZOOM_PIVOT } from "@/constants/map";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const ReportMap = () => {
  return (
    <MapContainer
      center={[16.0471688, 108.206706]}
      zoom={MAP_ZOOM_DEFAULT}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=674052d5aeb7658157d37306d8fc0bb42e7b69cff5e37440&api-version=1.1"
      />
      <MyLocation />
      <ListMarker />
    </MapContainer>
  );
};

const ListMarker = () => {
  const [zoomLevel, setZoomLevel] = useState(MAP_ZOOM_DEFAULT);
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
      setBounds(mapEvents.getBounds());
    },
    dragend: () => {
      setZoomLevel(mapEvents.getZoom());
      setBounds(mapEvents.getBounds());
    },
    loading: () => {
      setZoomLevel(mapEvents.getZoom());
      setBounds(mapEvents.getBounds());
    },
  });
  const params = {
    neLat: bounds?._northEast?.lat,
    neLng: bounds?._northEast?.lng,
    swLat: bounds?._southWest?.lat,
    swLng: bounds?._southWest?.lng,
  };

  const { data: areaMarkers } = useQuery({
    queryKey: ["map-area", params],
    queryFn: () => mapService.mapArea(params),
    enabled: !!bounds && zoomLevel < MAP_ZOOM_PIVOT,
    keepPreviousData: true,
    cacheTime: 1000, // 1 second
    staleTime: Infinity,
  });

  const { data: ticketMarkers } = useQuery({
    queryKey: ["map-ticket", params],
    queryFn: () => mapService.mapTicket(params),
    enabled: !!bounds && zoomLevel >= MAP_ZOOM_PIVOT,
    keepPreviousData: true,
    cacheTime: 1000, // 1 second
    staleTime: Infinity,
  });

  const listAreaMarker = useMemo(() => {
    if (areaMarkers && zoomLevel < MAP_ZOOM_PIVOT) {
      return areaMarkers.map((item) => (
        <Marker
          icon={commonMarker}
          position={[item.lat, item.lng]}
          key={item.id}
        >
          <Popup>{item.name}</Popup>
        </Marker>
      ));
    }
  }, [areaMarkers, zoomLevel]);

  const listTicketMarker = useMemo(() => {
    if (ticketMarkers && zoomLevel >= MAP_ZOOM_PIVOT) {
      return ticketMarkers.map((item) => (
        <Marker
          icon={commonMarker}
          position={[item.lat, item.lng]}
          key={item.id}
        >
          <Popup>
            <TicketPopup data={item} />
          </Popup>
        </Marker>
      ));
    }
  }, [ticketMarkers, zoomLevel]);

  return (
    <>
      {listAreaMarker}
      {listTicketMarker}
    </>
  );
};

export default ReportMap;
