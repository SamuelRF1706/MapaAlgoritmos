const API_URL = "http://localhost:3000";

// 🔹 GET
export const obtenerPacientes = async () => {
  const res = await fetch(`${API_URL}/pacientes`);
  return res.json();
};

// 🔹 POST
export const crearPaciente = async (paciente) => {
  const res = await fetch(`${API_URL}/pacientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  return res.json();
};

// 🔹 PUT
export const actualizarPaciente = async (id, paciente) => {
  const res = await fetch(`${API_URL}/pacientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  return res.json();
};

// 🔹 DELETE
export const eliminarPaciente = async (id) => {
  const res = await fetch(`${API_URL}/pacientes/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// 🔹 RUTA
export const generarRutaAPI = async (inicio) => {
  const res = await fetch(`${API_URL}/ruta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inicio }),
  });
  return res.json();
};