const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { createTask, getTasks, updateTask } = require('../services/task.service');

const createSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('').optional(),
  priority: Joi.string().valid('Low','Medium','High').default('Medium'),
  due_date: Joi.string().isoDate().required(), // expects YYYY-MM-DD or full iso
  status: Joi.string().valid('Open','In Progress','Done').default('Open')
});

const patchSchema = Joi.object({
  status: Joi.string().valid('Open','In Progress','Done').optional(),
  priority: Joi.string().valid('Low','Medium','High').optional()
}).min(1);

router.post('/', (req, res) => {
  const { error, value } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const task = createTask(value);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/', (req, res) => {
  const { status, priority, sortByDue } = req.query;
  try {
    const tasks = getTasks({ status, priority, sortByDue: sortByDue === 'true' });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.patch('/:id', (req, res) => {
  const { error, value } = patchSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const task = updateTask(req.params.id, value);
    if (!task) return res.status(404).json({ error: 'Task not found or no changes' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
