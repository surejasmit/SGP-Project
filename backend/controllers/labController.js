const Lab = require('../models/Lab');
const Issue = require('../models/Issue');

const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().sort({ createdAt: -1 });
    res.json(labs);
  } catch (error) {
    console.error('Get labs error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found.' });
    }
    res.json(lab);
  } catch (error) {
    console.error('Get lab error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const createLab = async (req, res) => {
  try {
    const { labName, type, equipment } = req.body;

    const lab = new Lab({
      labName,
      type,
      equipment: equipment || {}
    });

    await lab.save();
    res.status(201).json(lab);
  } catch (error) {
    console.error('Create lab error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateLab = async (req, res) => {
  try {
    const { labName, type, equipment, status } = req.body;

    const lab = await Lab.findByIdAndUpdate(
      req.params.id,
      { labName, type, equipment, status },
      { new: true, runValidators: true }
    );

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found.' });
    }

    res.json(lab);
  } catch (error) {
    console.error('Update lab error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const deleteLab = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndDelete(req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found.' });
    }

    // Also delete related issues
    await Issue.deleteMany({ labId: req.params.id });

    res.json({ message: 'Lab deleted successfully.' });
  } catch (error) {
    console.error('Delete lab error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const updateLabStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['normal', 'issue'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const lab = await Lab.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found.' });
    }

    res.json(lab);
  } catch (error) {
    console.error('Update lab status error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getAllLabs,
  getLabById,
  createLab,
  updateLab,
  deleteLab,
  updateLabStatus
};