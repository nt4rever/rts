import { commonMarker } from "@/components/MapIcon";
import { MyLocation } from "@/components/MyLocation";
import { MAP_ZOOM_DEFAULT } from "@/constants/map";
import { Modal } from "@mantine/core";
import { Box } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const ModalLocation = (props) => {
  const { open, onClose, location, handleSetLocation } = props;
  const { t } = useTranslation();

  return (
    <Modal
      size="lg"
      title={t("common.choose-location")}
      opened={open}
      onClose={onClose}
      zIndex={3000}
    >
      <Box height="70vh">
        <MapContainer
          center={[16.0471688, 108.206706]}
          zoom={MAP_ZOOM_DEFAULT}
          scrollWheelZoom={true}
          attributionControl={false}
          minZoom={0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // url="https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=674052d5aeb7658157d37306d8fc0bb42e7b69cff5e37440&api-version=1.1"
          />
          <MyLocation />
          <LocationMaker
            location={location}
            handleSetLocation={handleSetLocation}
          />
        </MapContainer>
      </Box>
    </Modal>
  );
};

const LocationMaker = ({ location, handleSetLocation }) => {
  const [position, setPosition] = useState(location || undefined);

  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      handleSetLocation(e.latlng);
    },
  });

  if (!position) {
    return null;
  }

  return <Marker position={position} icon={commonMarker}></Marker>;
};

export default ModalLocation;
