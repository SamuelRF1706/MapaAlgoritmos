import React, { useState } from "react";

import AgregarPaciente from "./AgregarPaciente";

function ControlPanel({
  cargarPacientes,
  generarRuta,
  agregarPaciente
}) {

  const [mostrarForm, setMostrarForm] =
    useState(false);

  return (

    <div className="card shadow-lg border-0">

      <div className="card-body">

        <h4 className="mb-3 text-primary">
          Panel de Control
        </h4>

        <div className="d-flex gap-2 flex-wrap">

          <button
            className="btn btn-outline-primary"
            onClick={cargarPacientes}
          >
            Cargar Pacientes
          </button>

          <button
            className="btn btn-success"
            onClick={generarRuta}
          >
            Generar Ruta (Ubicación actual)
          </button>

          <button
            className="btn btn-dark"
            onClick={() =>
              setMostrarForm(!mostrarForm)
            }
          >

            {
              mostrarForm
                ? "Cerrar"
                : "Agregar Paciente"
            }

          </button>

        </div>


        {
          mostrarForm && (
            <AgregarPaciente
              agregarPaciente={agregarPaciente}
            />
          )
        }

      </div>

    </div>
  );
}

export default ControlPanel;