// backend/db.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'task_tracker.db');
const MIGRATION_FILE = path.join(__dirname, 'migrations', 'init.sql');

const db = new Database(DB_PATH);

// run migration
const initSql = fs.readFileSync(MIGRATION_FILE, 'utf8');
db.exec(initSql);

module.exports = db;
