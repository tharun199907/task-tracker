# 📝 Task Tracker App

A **full-stack Task Management Application** built using **React (frontend)**, **Node.js + Express (backend)**, and **SQLite3 (database)**.  
This app allows users to create, manage, and track their tasks, with live insights such as the number of open tasks, due soon tasks, and priority distribution.

---

## 🚀 Features

### 🧭 Core Features
- Add, edit, and delete tasks.
- Filter and sort tasks by status or due date.
- Mark tasks as **Open**, **In Progress**, or **Done**.
- View insights like:
  - Total open tasks
  - Tasks due soon (within 3 days)
  - Priority distribution
  - Busiest upcoming day

### 🧮 Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js + Vite |
| **Backend** | Node.js + Express |
| **Database** | SQLite3 |
| **Styling** | CSS / Tailwind (optional) |
| **Runtime Tools** | Nodemon for dev server reloads |

---

## 📂 Project Structure

task-tracker/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ └── src/
│ ├── routes/
│ │ └── tasks.router.js
│ ├── services/
│ │ ├── task.service.js
│ │ └── insight.service.js
│ └── models/
│ └── task.model.js
│
├── frontend/
│ ├── index.html
│ ├── vite.config.js
│ └── src/
│ ├── App.jsx
│ ├── api.js
│ ├── components/
│ │ ├── TaskList.jsx
│ │ ├── TaskForm.jsx
│ │ └── InsightsPanel.jsx
│ └── styles/
│ └── app.css
│
└── README.md