const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const { auth, isAdmin } = require('../middleware/auth');

// Routes
router.get('/', auth, labController.getAllLabs);
router.get('/:id', auth, labController.getLabById);
router.post('/', auth, isAdmin, labController.createLab);
router.put('/:id', auth, isAdmin, labController.updateLab);
router.delete('/:id', auth, isAdmin, labController.deleteLab);
router.patch('/:id/status', auth, isAdmin, labController.updateLabStatus);

module.exports = router;