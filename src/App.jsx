import React from "react";
import ControlPanel from "./components/ControlPanel";
import ResultadoRuta from "./components/ResultadoRuta";
import Mapa from "./components/Mapa";
import { useRuta } from "./hooks/useRuta";

function App() {
  const { pacientes, ruta, cargarPacientes, generarRuta } = useRuta();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Sistema de Rutas</h2>

      <ControlPanel
        cargarPacientes={cargarPacientes}
        generarRuta={generarRuta}
      />

      <ResultadoRuta ruta={ruta} />

      <Mapa pacientes={pacientes} ruta={ruta} />
    </div>
  );
}

export default App;