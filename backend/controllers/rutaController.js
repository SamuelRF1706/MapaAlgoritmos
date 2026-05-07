const { readData } = require("../services/fileServices");

const {
  vecinoMasCercanoInteligente
} = require("../services/algoritmoRuta");

const { calcularDistancia } = require("../utils/distancia");

exports.generarRuta = (req, res) => {

  try {

    const pacientes = readData();

    if (!Array.isArray(pacientes) || pacientes.length === 0) {

      return res.status(400).json({
        error: "No hay pacientes"
      });
    }

    // ===== UBICACIÓN ACTUAL DEL USUARIO =====

    let inicio = req.body?.inicio;

    // Si no llega ubicación válida,
    // usa el primer paciente como fallback

    if (
      !inicio ||
      typeof inicio.lat !== "number" ||
      typeof inicio.lng !== "number"
    ) {

      inicio = pacientes[0];
    }

    const puntoInicio = {
      id: 0,
      nombre: "Inicio",
      lat: inicio.lat,
      lng: inicio.lng,
    };

    // ===== FILTRAR PACIENTES VÁLIDOS =====

    const pacientesValidos = pacientes.filter(
      (p) =>
        p.lat !== undefined &&
        p.lng !== undefined
    );

    // ===== GENERAR RUTA INTELIGENTE =====

    const ruta = vecinoMasCercanoInteligente(
      pacientesValidos,
      puntoInicio
    );

    // ===== CALCULAR DISTANCIA TOTAL =====

    let distanciaTotal = 0;

    for (let i = 0; i < ruta.length - 1; i++) {

      distanciaTotal += calcularDistancia(
        ruta[i],
        ruta[i + 1]
      );
    }

    // ===== RESPUESTA =====

    res.json({
      inicio: puntoInicio,
      ruta,
      distanciaTotal,
    });

  } catch (error) {

    console.error(
      "Error en generarRuta:",
      error
    );

    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
};