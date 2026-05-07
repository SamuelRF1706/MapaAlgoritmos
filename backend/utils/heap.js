class MaxHeap {

  constructor() {
    this.heap = [];
  }

  insertar(paciente) {

    this.heap.push(paciente);

    // Ordena de mayor score a menor
    this.heap.sort((a, b) => b.score - a.score);
  }

  extraerMax() {

    if (this.heap.length === 0) {
      return null;
    }

    return this.heap.shift();
  }

  estaVacio() {
    return this.heap.length === 0;
  }

  obtenerHeap() {
    return this.heap;
  }
}

module.exports = MaxHeap;