const Issue = require('../models/Issue');
const Lab = require('../models/Lab');

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('labId', 'labName type')
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('labId', 'labName type')
      .populate('reportedBy', 'name email');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getIssuesByLab = async (req, res) => {
  try {
    const issues = await Issue.find({ labId: req.params.labId })
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    console.error('Get issues by lab error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const createIssue = async (req, res) => {
  try {
    const { labId, equipmentType, description } = req.body;

    // Check if lab exists
    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found.' });
    }

    // Create issue
    const issue = new Issue({
      labId,
      reportedBy: req.user._id,
      equipmentType,
      description
    });

    await issue.save();

    // Update lab status to 'issue'
    await Lab.findByIdAndUpdate(labId, { status: 'issue' });

    // Populate the response
    await issue.populate('labId', 'labName type');
    await issue.populate('reportedBy', 'name email');

    res.status(201).json(issue);
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const resolveIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' });
    }

    // Update issue status
    issue.status = 'resolved';
    issue.resolvedAt = new Date();
    await issue.save();

    // Check if there are any open issues for this lab
    const openIssues = await Issue.countDocuments({
      labId: issue.labId,
      status: 'open'
    });

    // If no open issues, update lab status to normal
    if (openIssues === 0) {
      await Lab.findByIdAndUpdate(issue.labId, { status: 'normal' });
    }

    // Populate the response
    await issue.populate('labId', 'labName type');
    await issue.populate('reportedBy', 'name email');

    res.json(issue);
  } catch (error) {
    console.error('Resolve issue error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' });
    }

    // Check if there are any remaining open issues for this lab
    const openIssues = await Issue.countDocuments({
      labId: issue.labId,
      status: 'open'
    });

    // If no open issues, update lab status to normal
    if (openIssues === 0) {
      await Lab.findByIdAndUpdate(issue.labId, { status: 'normal' });
    }

    res.json({ message: 'Issue deleted successfully.' });
  } catch (error) {
    console.error('Delete issue error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getResolvedIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: 'resolved' })
      .populate('labId', 'labName type')
      .populate('reportedBy', 'name email')
      .sort({ resolvedAt: -1 });

    res.json(issues);
  } catch (error) {
    console.error('Get resolved issues error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  getAllIssues,
  getIssueById,
  getIssuesByLab,
  createIssue,
  resolveIssue,
  deleteIssue,
  getResolvedIssues
};