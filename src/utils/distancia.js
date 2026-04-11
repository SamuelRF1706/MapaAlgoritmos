export function calcularDistancia(p1, p2) {
  const dx = p1.lat - p2.lat;
  const dy = p1.lng - p2.lng;
  return Math.sqrt(dx * dx + dy * dy);
}