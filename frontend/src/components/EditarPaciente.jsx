import React, { useState } from "react";

function EditarPaciente({

  paciente,

  editarPaciente,

  cerrar,

}) {

  const [form, setForm] =
    useState(paciente);


  // ===== INPUTS =====

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  };


  // ===== PRIORIDAD → URGENCIA =====

  const obtenerUrgencia = (
    prioridad
  ) => {

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


  // ===== GUARDAR =====

  const guardarCambios =
    async () => {

      try {

        await editarPaciente(

          form.id,

          {

            ...form,

            edad:
              parseInt(form.edad),

            urgencia:
              obtenerUrgencia(
                form.prioridad
              ),

          }
        );

        alert(
          "Paciente actualizado"
        );

        cerrar();

      } catch (error) {

        console.error(error);

        alert(
          "Error actualizando paciente"
        );
      }
    };


  return (

    <div className="mt-4 gps-divider-top pt-4">

      <h5 className="mb-3">

        ✏️ Editar Paciente

      </h5>


      <div className="row g-3">

        {/* NOMBRE */}

        <div className="col-md-6">

          <input
            className="form-control"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

        </div>


        {/* TELÉFONO */}

        <div className="col-md-6">

          <input
            className="form-control"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

        </div>


        {/* DIRECCIÓN */}

        <div className="col-md-12">

          <input
            className="form-control"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
          />

        </div>


        {/* EDAD */}

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


        {/* PRIORIDAD */}

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


        {/* SERVICIO */}

        <div className="col-md-12">

          <select
            className="form-select"
            name="tipoServicio"
            value={form.tipoServicio}
            onChange={handleChange}
          >

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


      {/* BOTONES */}

      <div className="d-flex gap-2 mt-4">

        <button
          className="btn btn-gps-secondary w-50"
          type="button"
          onClick={cerrar}
        >

          Cancelar

        </button>


        <button
          className="btn btn-gps-primary-solid w-50"
          type="button"
          onClick={guardarCambios}
        >

          Actualizar

        </button>

      </div>

    </div>
  );
}

export default EditarPaciente;