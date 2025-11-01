const db = require('../../db');

const createTask = ({ title, description, priority, due_date, status = 'Open' }) => {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(title, description || '', priority || 'Medium', due_date, status);
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
};

const getTasks = ({ status, priority, sortByDue = false }) => {
  let sql = 'SELECT * FROM tasks';
  const clauses = [];
  const params = [];

  if (status) {
    clauses.push('status = ?');
    params.push(status);
  }
  if (priority) {
    clauses.push('priority = ?');
    params.push(priority);
  }
  if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');
  if (sortByDue) sql += ' ORDER BY due_date ASC';
  else sql += ' ORDER BY created_at DESC';

  return db.prepare(sql).all(...params);
};

const updateTask = (id, { status, priority }) => {
  const fields = [];
  const params = [];

  if (status) {
    fields.push('status = ?');
    params.push(status);
  }
  if (priority) {
    fields.push('priority = ?');
    params.push(priority);
  }
  if (!fields.length) return null;
  params.push(id);

  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
  const info = db.prepare(sql).run(...params);
  if (info.changes === 0) return null;
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
};

module.exports = { createTask, getTasks, updateTask };
