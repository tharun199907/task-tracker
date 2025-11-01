export default function InsightsPanel({ insights }) {
  if (!insights) return <div>Loading insights...</div>;

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h3>Smart Insights</h3>
      <p>{insights.summary}</p>
      <div>
        <strong>Open:</strong> {insights.totalOpen} &nbsp;
        <strong>Due soon:</strong> {insights.dueSoon}
      </div>
      <div>
        <strong>By priority:</strong>
        <ul>
          {insights.byPriority.map(p => <li key={p.priority}>{p.priority}: {p.cnt}</li>)}
        </ul>
      </div>
    </div>
  );
}
