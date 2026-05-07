import React, { useEffect } from "react";

import ControlPanel from "./components/ControlPanel";
import Mapa from "./components/Mapa";

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

    <div className="container-fluid px-3 px-md-4 gps-app">
      {/* TÍTULO */}

      <h2 className="gps-page-title text-center gps-app-title">

        Sistema Inteligente de Rutas Médicas

      </h2>


      <ControlPanel
        cargarPacientes={cargarPacientes}
        generarRuta={generarRuta}
        agregarPaciente={agregarPaciente}
        pacientes={pacientes}
        editarPaciente={editarPaciente}
        borrarPaciente={borrarPaciente}
        listaRuta={listaRuta}
      />


      <div className="card panel-gps gps-map-stage">

        <div className="card-body p-2 gps-map-stage-body">

          <Mapa
            pacientes={pacientes}
            ruta={listaRuta}
          />

        </div>

      </div>

    </div>
  );
}

export default App;
