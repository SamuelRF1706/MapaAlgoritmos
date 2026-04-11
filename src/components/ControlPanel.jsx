import React from "react";

function ControlPanel({ cargarPacientes, generarRuta }) {
  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Panel de Control</h5>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={cargarPacientes}
        >
          Cargar Pacientes
        </button>

        <button
          className="btn btn-success"
          onClick={generarRuta}
        >
          Generar Ruta
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;