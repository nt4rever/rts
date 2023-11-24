import L from "leaflet";

export const iconCurrentLocation = L.divIcon({
  className: "marker-location",
  html: '<div class="marker-pin"></div>',
  iconSize: [15, 15],
  iconAnchor: [15, 15],
});

export const commonMarker = L.icon({
  iconUrl: "/assets/icons/base-marker.svg",
  iconSize: [40, 40], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
});
