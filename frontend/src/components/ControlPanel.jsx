import React, { useState } from "react";

function ControlPanel({ cargarPacientes, generarRuta, agregarPaciente }) {
  const [mostrarForm, setMostrarForm] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    lat: "",
    lng: "",
    telefono: "",
    tipoServicio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarPaciente = () => {
    if (!form.nombre || !form.lat || !form.lng) {
      alert("Completa los campos obligatorios");
      return;
    }

    agregarPaciente({
      ...form,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      estado: "pendiente",
      prioridad: "media",
    });

    setForm({
      nombre: "",
      direccion: "",
      lat: "",
      lng: "",
      telefono: "",
      tipoServicio: "",
    });

    setMostrarForm(false);
  };

  return (
    <div className="card shadow-lg border-0">
      <div className="card-body">

        <h4 className="mb-3 text-primary">Panel de Control</h4>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-primary" onClick={cargarPacientes}>
            Cargar Pacientes
          </button>

          <button className="btn btn-success" onClick={generarRuta}>
            Generar Ruta (Ubicación actual)
          </button>

          <button
            className="btn btn-dark"
            onClick={() => setMostrarForm(!mostrarForm)}
          >
            {mostrarForm ? "Cerrar" : "Agregar Paciente"}
          </button>
        </div>

        {mostrarForm && (
          <div className="mt-4 p-3 bg-light rounded border">

            <h6 className="mb-3">Nuevo Paciente</h6>

            <div className="row g-2">

              <div className="col-md-6">
                <input className="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange}/>
              </div>

              <div className="col-md-12">
                <input className="form-control" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" name="lat" placeholder="Latitud" value={form.lat} onChange={handleChange}/>
              </div>

              <div className="col-md-6">
                <input className="form-control" name="lng" placeholder="Longitud" value={form.lng} onChange={handleChange}/>
              </div>

              <div className="col-md-12">
                <input className="form-control" name="tipoServicio" placeholder="Tipo de servicio" value={form.tipoServicio} onChange={handleChange}/>
              </div>

            </div>

            <button className="btn btn-success mt-3 w-100" onClick={guardarPaciente}>
              Guardar Paciente
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;