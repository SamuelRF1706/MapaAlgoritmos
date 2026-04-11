import { useState } from "react";
import pacientesData from "../data/pacientes.json";
import { vecinoMasCercano } from "../algorithms/vecinoCercano";

export function useRuta() {
  const [pacientes, setPacientes] = useState([]);
  const [ruta, setRuta] = useState([]);

  // Cargar pacientes
  const cargarPacientes = () => {
    setPacientes(pacientesData);
  };

  // Generar ruta
  const generarRuta = () => {
  if (pacientes.length === 0) {
    alert("Primero carga los pacientes");
    return;
  }

  // Obtener ubicación real
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const inicio = {
        nombre: "Agente",
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      const resultado = vecinoMasCercano(pacientes, inicio);
      setRuta(resultado);
    },
    (error) => {
      alert("No se pudo obtener la ubicación");
      console.error(error);
    }
  );
};

  return {
    pacientes,
    ruta,
    cargarPacientes,
    generarRuta
  };
}