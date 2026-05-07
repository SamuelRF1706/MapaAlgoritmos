import React from "react";

function ResultadoRuta({ ruta }) {
  return (
    <div className="accordion mt-0 mt-xl-2" id="accordionRuta">
      <div className="accordion-item gps-accordion-item">

        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseRuta"
          >
            🚑 Ruta generada ({ruta.length})
          </button>
        </h2>

        <div id="collapseRuta" className="accordion-collapse collapse">
          <div
            className="accordion-body gps-scroll"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            {ruta.length === 0 ? (
              <p className="text-gps-muted mb-0">No hay ruta generada</p>
            ) : (
              <ol className="list-group list-group-numbered">
                {ruta.map((p, i) => (
                  <li key={i} className="list-group-item list-group-item-gps">
                    <strong>{p.nombre}</strong>
                    <br />
                    <small>
                      Lat: {p.lat} | Lng: {p.lng}
                    </small>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResultadoRuta;