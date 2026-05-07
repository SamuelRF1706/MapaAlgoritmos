import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

function Mapa({ pacientes = [], ruta = [] }) {

  useEffect(() => {

    const map = L.map("map").setView(
      [6.2442, -75.5812],
      13
    );

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap",
      }
    ).addTo(map);


    // ===== FUNCIÓN COLOR POR URGENCIA =====

    function obtenerColor(urgencia) {

      if (urgencia >= 5) {
        return "red";
      }

      if (urgencia >= 3) {
        return "orange";
      }

      return "blue";
    }


    // ===== MOSTRAR SOLO RUTA =====

    ruta.forEach((p) => {

      if (p?.lat && p?.lng) {

        const color = obtenerColor(p.urgencia);

        const icono = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              background:${color};
              width:18px;
              height:18px;
              border-radius:50%;
              border:3px solid white;
              box-shadow:0 0 5px rgba(0,0,0,0.5);
            "></div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        L.marker([p.lat, p.lng], {
          icon: icono
        })
          .addTo(map)
          .bindPopup(`
            <b>${p.nombre}</b><br/>
            Prioridad: ${p.prioridad}<br/>
            Score IA: ${p.score}
          `);
      }
    });


    // ===== RUTA REAL =====

    if (ruta.length >= 2) {

      const waypoints = ruta.map((p) =>
        L.latLng(p.lat, p.lng)
      );

      const routingControl = L.Routing.control({

        waypoints,

        router: L.Routing.osrmv1({
          serviceUrl:
            "https://router.project-osrm.org/route/v1",
          profile: "driving",
        }),

        lineOptions: {
          styles: [
            {
              color: "#0d6efd",
              weight: 5
            }
          ],
        },

        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        createMarker: () => null,

      }).addTo(map);


      routingControl.on(
        "routesfound",
        () => {
          console.log(
            "✅ Ruta inteligente generada"
          );
        }
      );

      routingControl.on(
        "routingerror",
        (e) => {
          console.error(
            "❌ Error OSRM:",
            e
          );
        }
      );

      map.fitBounds(
        L.latLngBounds(waypoints)
      );
    }

    const invalidate = () => map.invalidateSize();

    let innerRaf = 0;

    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(invalidate);
    });

    window.addEventListener("resize", invalidate);

    return () => {

      cancelAnimationFrame(outerRaf);

      if (innerRaf) {
        cancelAnimationFrame(innerRaf);
      }

      window.removeEventListener("resize", invalidate);

      map.remove();
    };

  }, [pacientes, ruta]);

  return (
    <div
      id="map"
    />
  );
}

export default Mapa;
