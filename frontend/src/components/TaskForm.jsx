import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Title and due date are required');
      return;
    }
    await onCreate({ title, description, priority, due_date: dueDate });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div >
        <input type='text' placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
      </div>
      <div>
        <textarea type='text' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>
          Priority:
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Due date:
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}
