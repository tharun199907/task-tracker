const db = require('../../db');
const { differenceInCalendarDays, parseISO } = require('date-fns');

function daysBetweenToday(isoDate) {
  const today = new Date();
  const d = new Date(isoDate + 'T00:00:00'); 
  const diff = Math.ceil((d - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
  return diff;
}

function getInsights() {
  const totalOpen = db.prepare("SELECT COUNT(*) as cnt FROM tasks WHERE status = 'Open'").get().cnt;
  const byPriority = db.prepare("SELECT priority, COUNT(*) as cnt FROM tasks GROUP BY priority").all();
  const dueSoon = db.prepare("SELECT COUNT(*) as cnt FROM tasks WHERE DATE(due_date) <= DATE('now', '+3 days') AND status != 'Done'").get().cnt;
  const byDay = db.prepare("SELECT due_date, COUNT(*) as cnt FROM tasks GROUP BY due_date ORDER BY due_date ASC").all();

  let dominantPriority = null;
  let max = 0;
  const totalTasks = db.prepare("SELECT COUNT(*) as cnt FROM tasks").get().cnt;
  byPriority.forEach(p => {
    if (p.cnt > max) { max = p.cnt; dominantPriority = p.priority; }
  });

  let busiestDay = null;
  if (byDay.length) {
    busiestDay = byDay.reduce((a, b) => (a.cnt >= b.cnt ? a : b));
  }
  
  let summary = `You have ${totalOpen} open task${totalOpen === 1 ? '' : 's'}.`;
  if (dominantPriority && totalTasks > 0) {
    summary += ` Most tasks are ${dominantPriority} priority.`;
  }
  if (dueSoon > 0) {
    summary += ` ${dueSoon} ${dueSoon === 1 ? 'task is' : 'tasks are'} due within 3 days.`;
  }
  if (busiestDay) {
    summary += ` Busiest day: ${busiestDay.due_date} (${busiestDay.cnt} task${busiestDay.cnt > 1 ? 's' : ''}).`;
  }

  return {
    totalOpen,
    byPriority,
    dueSoon,
    busiestDay,
    summary
  };
}

module.exports = { getInsights };
