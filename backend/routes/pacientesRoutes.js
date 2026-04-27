const express = require('express');
const router = express.Router();

const controller = require('../controllers/pacientesController');

router.get('/', controller.getPacientes);
router.post('/', controller.createPaciente);
router.put('/:id', controller.updatePaciente);
router.delete('/:id', controller.deletePaciente);

module.exports = router;