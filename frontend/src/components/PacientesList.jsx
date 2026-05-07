import React, { useState } from "react";
import EditarPaciente from "./EditarPaciente";

function PacientesList({
  pacientes,
  editarPaciente,
}) {

  const [busqueda, setBusqueda] =
    useState("");

  const [pacienteSeleccionado,
    setPacienteSeleccionado] =
    useState(null);


  // ===== FILTRAR =====

  const filtrados = pacientes.filter((p) =>
    p.nombre
      .toLowerCase()
      .includes(
        busqueda.toLowerCase()
      )
  );


  return (

    <div className="accordion mt-0">

      <div className="accordion-item gps-accordion-item">

        {/* HEADER */}

        <h2 className="accordion-header">

          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePacientes"
          >

            📋 Lista de Pacientes
            ({pacientes.length})

          </button>

        </h2>


        {/* CONTENIDO */}

        <div
          id="collapsePacientes"
          className="accordion-collapse collapse"
        >

          <div
            className="accordion-body gps-scroll"
            style={{
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >

            {/* ===== SI NO HAY PACIENTE SELECCIONADO ===== */}

            {!pacienteSeleccionado && (

              <>

                {/* BUSCADOR */}

                <input
                  className="form-control mb-3"
                  placeholder="Buscar paciente..."
                  value={busqueda}
                  onChange={(e) =>
                    setBusqueda(
                      e.target.value
                    )
                  }
                />


                {/* LISTA */}

                <ul className="list-group">

                  {filtrados.map((p) => (

                    <li
                      key={p.id}
                      className="list-group-item list-group-item-action list-group-item-gps"
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        setPacienteSeleccionado(p)
                      }
                    >

                      <strong>
                        {p.nombre}
                      </strong>

                      <br />

                      <small>
                        {p.direccion}
                      </small>

                    </li>
                  ))}

                </ul>

              </>
            )}


            {/* ===== FORMULARIO ===== */}

            {pacienteSeleccionado && (

              <EditarPaciente
                paciente={
                  pacienteSeleccionado
                }
                editarPaciente={
                  editarPaciente
                }
                cerrar={() =>
                  setPacienteSeleccionado(null)
                }
              />

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default PacientesList;