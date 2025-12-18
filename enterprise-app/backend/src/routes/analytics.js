const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// Get dashboard analytics (Admin/Manager only)
router.get('/dashboard', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const [
      totalTasks,
      completedTasks,
      totalProjects,
      activeProjects,
      totalUsers,
      tasksByStatus,
      tasksByPriority,
    ] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: 'done' }),
      Project.countDocuments(),
      Project.countDocuments({ status: 'active' }),
      User.countDocuments({ isActive: true }),
      Task.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Task.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          completionRate: totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(2) : 0,
          byStatus: tasksByStatus,
          byPriority: tasksByPriority,
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
        },
        users: {
          total: totalUsers,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project analytics
router.get('/projects/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ project: req.params.id });
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progress = tasks.length > 0 ? (completedTasks / tasks.length * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        totalTasks: tasks.length,
        completedTasks,
        progress: parseFloat(progress),
        tasksByStatus: tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

