import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';
import { fetchTasks, createTask, patchTask, getInsights } from './api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortByDue, setSortByDue] = useState(true);

  async function loadTasks() {
    try {
      const t = await fetchTasks({ status: filterStatus || undefined, sortByDue });
      setTasks(t);
    } catch (err) {
      console.error(err);
      alert('Failed to load tasks');
    }
  }

  async function loadInsights() {
    try {
      const ins = await getInsights();
      setInsights(ins);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTasks();
    loadInsights();
  }, [filterStatus, sortByDue]);

  const handleCreate = async (payload) => {
    await createTask(payload);
    await loadTasks();
    await loadInsights();
  };

  const handleUpdate = async (id, patch) => {
    await patchTask(id, patch);
    await loadTasks();
    await loadInsights();
  };

  return (
    <div style={{ padding:20, width:"95vw", height:"93Vh", backgroundColor: "#71a8faff", marginTop:"0px", overflow: "auto" }}>
      <h1>Task Tracker — Smart Insights</h1>
      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: 1 }}>
          <TaskForm onCreate={handleCreate} />
          <div style={{ marginBottom: 8 }}>
            <label>Filter status:
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value=''>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="checkbox" checked={sortByDue} onChange={e => setSortByDue(e.target.checked)} /> Sort by due date
            </label>
          </div>
          <TaskList tasks={tasks} onUpdate={handleUpdate} />
        </div>
        <div style={{ width: 320 }}>
          <InsightsPanel insights={insights} />
        </div>
      </div>
    </div>
  );
}
