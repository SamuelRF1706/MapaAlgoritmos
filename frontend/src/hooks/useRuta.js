import { useState } from "react";
import {
  obtenerPacientes,
  generarRutaAPI,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../services/api";

export function useRuta() {
  const [pacientes, setPacientes] = useState([]);
  const [ruta, setRuta] = useState({ ruta: [] });

  // 🔹 Cargar pacientes
  const cargarPacientes = async () => {
    try {
      const data = await obtenerPacientes();
      setPacientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
      setPacientes([]);
    }
  };

  // 🔥 GENERAR RUTA CON GEOLOCALIZACIÓN (FIX DEL ERROR)
  const generarRuta = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const inicio = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          const data = await generarRutaAPI(inicio);
          setRuta(data || { ruta: [] });

        } catch (error) {
          console.error("Error generando ruta:", error);
        }
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        alert("No se pudo obtener tu ubicación");
      }
    );
  };

  // 🔹 CRUD
  const agregarPaciente = async (nuevo) => {
    await crearPaciente(nuevo);
    cargarPacientes();
  };

  const editarPaciente = async (id, actualizado) => {
    await actualizarPaciente(id, actualizado);
    cargarPacientes();
  };

  const borrarPaciente = async (id) => {
    await eliminarPaciente(id);
    cargarPacientes();
  };

  return {
    pacientes,
    ruta,
    cargarPacientes,
    generarRuta,
    agregarPaciente,
    editarPaciente,
    borrarPaciente,
  };
}