import React, { useState } from "react";

function AgregarPaciente({ agregarPaciente }) {

  const [buscando, setBuscando] =
    useState(false);

  const [form, setForm] = useState({

    nombre: "",
    direccion: "",
    telefono: "",
    tipoServicio: "",
    prioridad: "media",
    edad: "",

  });


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  // ===== PRIORIDAD → URGENCIA =====

  const obtenerUrgencia = (prioridad) => {

    switch (prioridad) {

      case "alta":
        return 5;

      case "media":
        return 3;

      case "baja":
        return 1;

      default:
        return 3;
    }
  };


  // ===== BUSCAR COORDENADAS =====

  const buscarCoordenadas =
    async (direccion) => {

      try {

        setBuscando(true);

        const response = await fetch(

          `https://nominatim.openstreetmap.org/search?format=json&q=${direccion}, Medellín`

        );

        const data = await response.json();

        if (!data.length) {

          alert(
            "No se encontró la dirección"
          );

          return null;
        }

        return {

          lat: parseFloat(data[0].lat),

          lng: parseFloat(data[0].lon),

        };

      } catch (error) {

        console.error(error);

        alert(
          "Error buscando ubicación"
        );

        return null;

      } finally {

        setBuscando(false);
      }
    };


  // ===== GUARDAR =====

  const guardarPaciente =
    async () => {

      if (
        !form.nombre ||
        !form.direccion ||
        !form.tipoServicio
      ) {

        alert(
          "Completa los campos obligatorios"
        );

        return;
      }


      const coords =
        await buscarCoordenadas(
          form.direccion
        );

      if (!coords) return;


      agregarPaciente({

        ...form,

        lat: coords.lat,

        lng: coords.lng,

        edad: parseInt(form.edad),

        urgencia:
          obtenerUrgencia(
            form.prioridad
          ),

        fechaRegistro:
          new Date(),

        estado: "pendiente",
      });


      setForm({

        nombre: "",
        direccion: "",
        telefono: "",
        tipoServicio: "",
        prioridad: "media",
        edad: "",
      });
    };


  return (

    <div className="mt-4 p-3 bg-light rounded border">

      <h5 className="mb-3 text-primary">

        Nuevo Paciente

      </h5>

      <div className="row g-3">

        <div className="col-md-6">

          <input
            className="form-control"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

        </div>


        <div className="col-md-6">

          <input
            className="form-control"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

        </div>


        <div className="col-md-12">

          <input
            className="form-control"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
          />

        </div>


        <div className="col-md-6">

          <input
            type="number"
            className="form-control"
            name="edad"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
          />

        </div>


        <div className="col-md-6">

          <select
            className="form-select"
            name="prioridad"
            value={form.prioridad}
            onChange={handleChange}
          >

            <option value="baja">
              🔵 Baja
            </option>

            <option value="media">
              🟠 Media
            </option>

            <option value="alta">
              🔴 Alta
            </option>

          </select>

        </div>


        {/* ===== SERVICIOS DISPONIBLES ===== */}

        <div className="col-md-12">

          <select
            className="form-select"
            name="tipoServicio"
            value={form.tipoServicio}
            onChange={handleChange}
          >

            <option value="">
              Selecciona un servicio
            </option>

            <option value="Enfermería">
              Enfermería
            </option>

            <option value="Fisioterapia">
              Fisioterapia
            </option>

            <option value="Medicina general">
              Medicina general
            </option>

            <option value="Laboratorio">
              Laboratorio
            </option>

            <option value="Control">
              Control
            </option>

          </select>

        </div>

      </div>


      <button
        className="btn btn-success mt-4 w-100"
        onClick={guardarPaciente}
        disabled={buscando}
      >

        {
          buscando
            ? "Buscando dirección..."
            : "Guardar Paciente"
        }

      </button>

    </div>
  );
}

export default AgregarPaciente;