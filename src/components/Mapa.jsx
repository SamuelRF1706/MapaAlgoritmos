import { useEffect } from "react";
import L from "leaflet";

function Mapa({ pacientes, ruta }) {
  useEffect(() => {
    // Crear mapa
    const map = L.map("map").setView([6.2442, -75.5812], 13);

    // Capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Punto inicial
    const inicio = [6.2442, -75.5812];
    L.marker(inicio).addTo(map).bindPopup("Inicio");

    // Mostrar pacientes
    pacientes.forEach((p) => {
      L.marker([p.lat, p.lng])
        .addTo(map)
        .bindPopup(`
            <b>${p.nombre}</b><br/>
            ${p.direccion}<br/>
            📞 ${p.telefono}<br/>
            🏥 ${p.tipoServicio}
            `);
    });

    // Dibujar ruta
    if (ruta.length > 0) {
      const puntosRuta = [
        inicio,
        ...ruta.map((p) => [p.lat, p.lng]),
      ];

      L.polyline(puntosRuta, {
        color: "blue",
      }).addTo(map);
    }

    // Cleanup (MUY IMPORTANTE en React)
    return () => {
      map.remove();
    };
  }, [pacientes, ruta]);

  return (
    <div
      id="map"
      style={{ height: "500px", marginTop: "20px", borderRadius: "10px" }}
    ></div>
  );
}

export default Mapa;