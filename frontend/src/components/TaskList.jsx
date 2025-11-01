import React from 'react';

export default function TaskList({ tasks, onUpdate }) {
  if (!tasks || tasks.length === 0) return <div>No tasks</div>;
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Due</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.priority}</td>
            <td>{t.due_date}</td>
            <td>{t.status}</td>
            <td>
              <select value={t.status} onChange={e => onUpdate(t.id, { status: e.target.value })}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <select value={t.priority} onChange={e => onUpdate(t.id, { priority: e.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
