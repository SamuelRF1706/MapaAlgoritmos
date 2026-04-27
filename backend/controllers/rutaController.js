const { readData } = require("../services/fileServices"); // 🔥 AQUÍ ESTABA EL ERROR
const { vecinoMasCercano } = require("../services/algoritmoRuta");
const { calcularDistancia } = require("../utils/distancia");

exports.generarRuta = (req, res) => {
  try {
    const pacientes = readData();

    if (!Array.isArray(pacientes) || pacientes.length === 0) {
      return res.status(400).json({ error: "No hay pacientes" });
    }

    let inicio = req.body?.inicio;

    if (!inicio || typeof inicio.lat !== "number" || typeof inicio.lng !== "number") {
      inicio = pacientes[0];
    }

    const puntoInicio = {
      id: 0,
      nombre: "Inicio",
      lat: inicio.lat,
      lng: inicio.lng,
    };

    const pacientesValidos = pacientes.filter(
      (p) => p.lat !== undefined && p.lng !== undefined
    );

    const ruta = vecinoMasCercano(pacientesValidos, puntoInicio);

    let distanciaTotal = 0;

    for (let i = 0; i < ruta.length - 1; i++) {
      distanciaTotal += calcularDistancia(ruta[i], ruta[i + 1]);
    }

    res.json({
      inicio: puntoInicio,
      ruta,
      distanciaTotal,
    });

  } catch (error) {
    console.error("🔥 Error en generarRuta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};