const express = require('express');
const router = express.Router();

const { generarRuta } = require('../controllers/rutaController');

router.post('/', generarRuta);

module.exports = router;