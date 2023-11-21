import { useState } from "react";
import { Crosshair } from "react-feather";
import { Marker, useMap } from "react-leaflet";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { iconCurrentLocation } from "../MapIcon";

export function MyLocation({ currentStation }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  const locationHandleClick = () => {
    map.locate().addEventListener("locationfound", (e) => {
      setPosition(e.latlng);
      map.setView(e.latlng);
    });
  };

  useEffect(() => {
    if (currentStation !== undefined) map.setView(currentStation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStation]);

  return (
    <>
      {position === null ? null : (
        <Marker icon={iconCurrentLocation} position={position}></Marker>
      )}
      <div className={styles.map__location} onClick={locationHandleClick}>
        <Crosshair size={18} />
      </div>
    </>
  );
}
