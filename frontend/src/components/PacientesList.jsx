import React from "react";

function PacientesList({ pacientes }) {
  return (
    <div className="accordion mt-4" id="accordionPacientes">
      <div className="accordion-item shadow-sm">
        
        {/* HEADER */}
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePacientes"
          >
            📋 Lista de Pacientes ({pacientes.length})
          </button>
        </h2>

        {/* CONTENIDO */}
        <div
          id="collapsePacientes"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionPacientes"
        >
          <div
            className="accordion-body"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {pacientes.length === 0 ? (
              <p className="text-muted">No hay pacientes</p>
            ) : (
              <ul className="list-group">
                {pacientes.map((p) => (
                  <li key={p.id} className="list-group-item">
                    <strong>{p.nombre}</strong>
                    <br />
                    <small>{p.direccion}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PacientesList;