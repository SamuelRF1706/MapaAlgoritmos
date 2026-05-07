import React, { useState } from "react";

import AgregarPaciente from "./AgregarPaciente";
import PacientesList from "./PacientesList";
import ResultadoRuta from "./ResultadoRuta";

function ControlPanel({
  cargarPacientes,
  generarRuta,
  agregarPaciente,
  pacientes,
  editarPaciente,
  borrarPaciente,
  listaRuta,
}) {

  const [mostrarForm, setMostrarForm] =
    useState(false);

  return (

    <div className="card panel-gps panel-gps-control">

      <div className="card-body">

        <h4 className="mb-3 panel-gps-accent">
          Panel de Control
        </h4>

        <div className="d-flex gap-2 flex-wrap">

          <button
            className="btn btn-gps-ghost"
            type="button"
            onClick={cargarPacientes}
          >
            Cargar Pacientes
          </button>

          <button
            className="btn btn-gps-route"
            type="button"
            onClick={generarRuta}
          >
            Generar Ruta (Ubicación actual)
          </button>

          <button
            className="btn btn-gps-toggle"
            type="button"
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


        <div className="gps-panel-inner-grid row g-3 g-xl-4 mt-1">

          <div className="col-xl-6">

            <PacientesList
              pacientes={pacientes}
              editarPaciente={editarPaciente}
              borrarPaciente={borrarPaciente}
            />

          </div>

          <div className="col-xl-6">

            <ResultadoRuta ruta={listaRuta} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ControlPanel;