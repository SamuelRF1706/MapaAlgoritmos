import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

function Mapa({ pacientes = [], ruta = [] }) {
  useEffect(() => {
    const map = L.map("map").setView([6.2442, -75.5812], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Marcadores
    pacientes.forEach((p) => {
      if (p?.lat && p?.lng) {
        L.marker([p.lat, p.lng]).addTo(map);
      }
    });

    // 🔥 RUTA REAL
    if (ruta.length >= 2) {
      const waypoints = ruta.map((p) => L.latLng(p.lat, p.lng));

      const routingControl = L.Routing.control({
        waypoints,

        // 🔥 CLAVE: perfil + config correcta
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
          profile: "driving", // 🚨 IMPORTANTE
        }),

        lineOptions: {
          styles: [{ color: "#0d6efd", weight: 5 }],
        },

        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        createMarker: () => null,
      }).addTo(map);

      // 🔥 DEBUG CLAVE
      routingControl.on("routesfound", (e) => {
        console.log("✅ Ruta por calles generada");
      });

      routingControl.on("routingerror", (e) => {
        console.error("❌ OSRM falló:", e);
      });

      map.fitBounds(L.latLngBounds(waypoints));
    }

    return () => map.remove();
  }, [pacientes, ruta]);

  return <div id="map" style={{ height: "500px" }} />;
}

export default Mapa;