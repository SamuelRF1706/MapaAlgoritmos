function calcularHorasEspera(
  fechaRegistro
) {

  const ahora = new Date();

  const fecha =
    new Date(fechaRegistro);

  const diferencia =
    ahora - fecha;

  return diferencia /
    (1000 * 60 * 60);
}


// ===== NORMALIZAR =====

function normalizarEspera(
  horas
) {

  if (horas <= 2) return 1;

  if (horas <= 5) return 2;

  if (horas <= 10) return 3;

  if (horas <= 15) return 4;

  return 5;
}


function calcularScore(
  paciente
) {

  const horas =
    calcularHorasEspera(
      paciente.fechaRegistro
    );

  const esperaNormalizada =
    normalizarEspera(horas);


  const score =

    (paciente.urgencia * 0.7) +

    (paciente.edad * 0.2) +

    (esperaNormalizada * 0.1);


  return Number(
    score.toFixed(2)
  );
}


module.exports = {
  calcularScore
};