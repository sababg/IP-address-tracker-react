import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface MapViewProps {
  lat: number;
  lon: number;
}

export const MapView: React.FC<MapViewProps> = ({ lat, lon }) => {
  useEffect(() => {
    // Fix marker icons
    const iconDefault = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = iconDefault;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    // Create map
    const map = L.map("map").setView([lat, lon], 18);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup("<b>Hello!</b><br>This is your location.").openPopup();

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return <div id="map"></div>;
};
