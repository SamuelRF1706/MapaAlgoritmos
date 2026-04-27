const { calcularDistancia } = require("../utils/distancia");

function vecinoMasCercano(pacientes, inicio, limite = 8) {
  let noVisitados = [...pacientes];

  let ruta = [];
  let actual = inicio;

  // 🔥 CAMBIO CLAVE: limitar iteraciones
  while (noVisitados.length > 0 && ruta.length < limite) {
    let masCercano = null;
    let menorDistancia = Infinity;
    let indiceMasCercano = -1;

    for (let i = 0; i < noVisitados.length; i++) {
      const paciente = noVisitados[i];
      const distancia = calcularDistancia(actual, paciente);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        masCercano = paciente;
        indiceMasCercano = i;
      }
    }

    ruta.push(masCercano);
    actual = masCercano;
    noVisitados.splice(indiceMasCercano, 1);
  }

  return ruta;
}

module.exports = { vecinoMasCercano };