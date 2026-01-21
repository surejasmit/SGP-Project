const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { auth, isAdmin, isStudent } = require('../middleware/auth');

// Routes
router.get('/', auth, issueController.getAllIssues);
router.get('/resolved', auth, issueController.getResolvedIssues);
router.get('/:id', auth, issueController.getIssueById);
router.get('/lab/:labId', auth, issueController.getIssuesByLab);
router.post('/', auth, isStudent, issueController.createIssue);
router.patch('/:id/resolve', auth, isAdmin, issueController.resolveIssue);
router.delete('/:id', auth, isAdmin, issueController.deleteIssue);

module.exports = router;