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

  // 🔄 Cargar pacientes al iniciar
  useEffect(() => {
    cargarPacientes();
  }, []);

  // 🔥 FIX CLAVE: incluir punto inicial en la ruta
  const listaRuta = ruta?.inicio
    ? [ruta.inicio, ...(ruta.ruta || [])]
    : [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Sistema de Rutas</h2>

      {/* PANEL SUPERIOR */}
      <ControlPanel
        cargarPacientes={cargarPacientes}
        generarRuta={generarRuta}
        agregarPaciente={agregarPaciente}
      />

      {/* LAYOUT */}
      <div className="row mt-4">

        {/* IZQUIERDA */}
        <div className="col-md-4">

          {/* LISTA DE PACIENTES */}
          <div className="card mb-3 shadow-sm">
            <div className="card-header">
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

          {/* RUTA GENERADA */}
          <div className="card shadow-sm">
            <div className="card-header">
              Ruta Generada
            </div>
            <div className="card-body">
              <ResultadoRuta ruta={listaRuta} />
            </div>
          </div>

        </div>

        {/* DERECHA → MAPA */}
        <div className="col-md-8">
          <Mapa pacientes={pacientes} ruta={listaRuta} />
        </div>

      </div>
    </div>
  );
}

export default App;