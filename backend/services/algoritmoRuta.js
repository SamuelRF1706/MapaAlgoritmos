const { calcularDistancia } = require("../utils/distancia");

const { calcularScore } = require("../utils/heuristica");

const MaxHeap = require("../utils/heap");

function vecinoMasCercanoInteligente(
  pacientes,
  inicio,
  limite = 8
) {

  // ===== 1. CALCULAR SCORE IA =====

  const pacientesConScore = pacientes.map(paciente => ({
    ...paciente,
    score: calcularScore(paciente)
  }));


  // ===== 2. CREAR HEAP =====

  const heap = new MaxHeap();

  pacientesConScore.forEach(paciente => {
    heap.insertar(paciente);
  });


  // ===== 3. EXTRAER PACIENTES PRIORITARIOS =====

  const pacientesPrioritarios = [];

  while (
    !heap.estaVacio() &&
    pacientesPrioritarios.length < limite
  ) {
    pacientesPrioritarios.push(heap.extraerMax());
  }


  // ===== 4. APLICAR VECINO MÁS CERCANO =====

  let noVisitados = [...pacientesPrioritarios];

  let ruta = [];

  let actual = inicio;

  while (noVisitados.length > 0) {

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

module.exports = {
  vecinoMasCercanoInteligente
};