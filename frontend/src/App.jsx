import React, { useEffect } from "react";

import ControlPanel from "./components/ControlPanel";
import ResultadoRuta from "./components/ResultadoRuta";
import Mapa from "./components/Mapa";
import PacientesList from "./components/PacientesList";

import { useRuta } from "./hooks/useRuta";

function App() {

  const {
    pacientes,
    ruta,
    cargarPacientes,
    generarRuta,
    agregarPaciente,
    editarPaciente,
    borrarPaciente,
  } = useRuta();


  // ===== CARGAR PACIENTES =====

  useEffect(() => {

    cargarPacientes();

  }, []);


  // ===== INCLUIR PUNTO INICIAL =====

  const listaRuta = ruta?.inicio
    ? [ruta.inicio, ...(ruta.ruta || [])]
    : [];


  return (

    <div className="container-fluid px-4 mt-4">

      {/* TÍTULO */}

      <h2 className="text-center mb-4">

        Sistema Inteligente de Rutas Médicas

      </h2>


      {/* PANEL SUPERIOR */}

      <ControlPanel
        cargarPacientes={cargarPacientes}
        generarRuta={generarRuta}
        agregarPaciente={agregarPaciente}
      />


      {/* CONTENIDO PRINCIPAL */}

      <div className="row mt-4 g-4">

        {/* IZQUIERDA */}

        <div className="col-lg-4">

          {/* PACIENTES */}

          <div className="card mb-4 shadow-sm border-0">

            <div className="card-header fw-bold">

              Lista de Pacientes

            </div>

            <div className="card-body">

              <PacientesList
                pacientes={pacientes}
                editarPaciente={editarPaciente}
                borrarPaciente={borrarPaciente}
              />

            </div>

          </div>


          {/* RUTA */}

          <div className="card shadow-sm border-0">

            <div className="card-header fw-bold">

              Ruta Generada

            </div>

            <div className="card-body">

              <ResultadoRuta
                ruta={listaRuta}
              />

            </div>

          </div>

        </div>


        {/* DERECHA → MAPA */}

        <div className="col-lg-8">

          <div className="card shadow-sm border-0">

            <div className="card-body p-2">

              <Mapa
                pacientes={pacientes}
                ruta={listaRuta}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;