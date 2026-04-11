import React from "react";

function ResultadoRuta({ ruta }) {
  return (
    <div className="card mt-4 p-3 shadow-sm">
      <h5>Ruta generada</h5>

      {ruta.length === 0 ? (
        <p className="text-muted">No hay ruta generada</p>
      ) : (
        <ol className="list-group list-group-numbered mt-3">
          {ruta.map((paciente, index) => (
            <li key={index} className="list-group-item">
              <strong>{paciente.nombre}</strong> <br />
              Lat: {paciente.lat} | Lng: {paciente.lng}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ResultadoRuta;