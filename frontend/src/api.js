const API_BASE = 'http://localhost:3000';

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function patchTask(id, patch) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function getInsights() {
  const res = await fetch(`${API_BASE}/insights`);
  return res.json();
}
