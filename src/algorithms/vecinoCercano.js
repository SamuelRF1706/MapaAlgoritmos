import { calcularDistancia } from "../utils/distancia";

export function vecinoMasCercano(pacientes, inicio) {
  // Copiamos la lista para no modificar la original
  let noVisitados = [...pacientes];

  let ruta = [];
  let actual = inicio;

  while (noVisitados.length > 0) {
    let masCercano = null;
    let menorDistancia = Infinity;
    let indiceMasCercano = -1;

    // Buscar el paciente más cercano
    for (let i = 0; i < noVisitados.length; i++) {
      const paciente = noVisitados[i];
      const distancia = calcularDistancia(actual, paciente);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        masCercano = paciente;
        indiceMasCercano = i;
      }
    }

    // Agregar a la ruta
    ruta.push(masCercano);

    // Actualizar punto actual
    actual = masCercano;

    // Eliminar de no visitados
    noVisitados.splice(indiceMasCercano, 1);
  }

  return ruta;
}
// Algoritmo del vecino más cercano para encontrar una ruta aproximada entre pacientes. Complejidad: O(n^2) 