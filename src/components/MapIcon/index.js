import L from "leaflet";

export const iconCurrentLocation = L.divIcon({
  className: "marker-location",
  html: '<div class="marker-pin"></div>',
  iconSize: [15, 15],
  iconAnchor: [15, 15],
});