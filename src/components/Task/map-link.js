import Link from "next/link";
import { Map } from "react-feather";

const MapLink = (props) => {
  const { lat, lng } = props;

  return (
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
      rel="noopener noreferrer"
      target="_blank"
      title="Go to map"
    >
      <Map size={20} color="rgb(108, 115, 127)" />
    </Link>
  );
};

export default MapLink;
