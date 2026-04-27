const express = require('express');
const cors = require('cors');

const pacientesRoutes = require('./routes/pacientesRoutes');
const rutaRoutes = require('./routes/rutaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/pacientes', pacientesRoutes);
app.use('/ruta', rutaRoutes);

module.exports = app;