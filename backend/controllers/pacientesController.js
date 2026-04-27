const { readData, writeData } = require('../services/fileServices');

// GET
exports.getPacientes = (req, res) => {
  const data = readData();
  res.json(data);
};

// CREATE
exports.createPaciente = (req, res) => {
  const data = readData();

  const newPaciente = {
    id: Date.now(),
    ...req.body
  };

  data.push(newPaciente);
  writeData(data);

  res.status(201).json(newPaciente);
};

// UPDATE
exports.updatePaciente = (req, res) => {
  const data = readData();

  const index = data.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  data[index] = { ...data[index], ...req.body };

  writeData(data);

  res.json(data[index]);
};

// DELETE
exports.deletePaciente = (req, res) => {
  const data = readData();

  const newData = data.filter(p => p.id != req.params.id);

  writeData(newData);

  res.json({ message: "Paciente eliminado" });
};