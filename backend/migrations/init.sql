CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK(priority IN ('Low','Medium','High')) NOT NULL DEFAULT 'Medium',
  due_date TEXT NOT NULL, -- ISO YYYY-MM-DD
  status TEXT CHECK(status IN ('Open','In Progress','Done')) NOT NULL DEFAULT 'Open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
