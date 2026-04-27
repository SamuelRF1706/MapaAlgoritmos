import React from "react";

function ResultadoRuta({ ruta }) {
  return (
    <div className="accordion mt-3" id="accordionRuta">
      <div className="accordion-item shadow-sm">

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
            className="accordion-body"
            style={{ maxHeight: "250px", overflowY: "auto" }}
          >
            {ruta.length === 0 ? (
              <p className="text-muted">No hay ruta generada</p>
            ) : (
              <ol className="list-group list-group-numbered">
                {ruta.map((p, i) => (
                  <li key={i} className="list-group-item">
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