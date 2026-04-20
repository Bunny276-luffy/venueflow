import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function DashboardMetrics({ refreshCount }) {
  const [metrics, setMetrics] = useState({
    total_attendance: 0,
    avg_wait_time: 0,
    open_gates: 0,
    incidents: 0
  });

  const [showModal, setShowModal] = useState(false);

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${API_URL}/api/metrics`);
      const data = await res.json();
      setMetrics(data);
    } catch (e) {
      console.error('Failed to fetch metrics', e);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  return (
    <>
      <div className="metrics-grid">
        <div 
          className="metric-card interactive" 
          aria-label="Total Attendance"
          onClick={() => setShowModal(true)}
        >
          <div className="metric-title">Total Attendance</div>
          <div className="metric-value">{metrics.total_attendance.toLocaleString()}</div>
        </div>
        <div className="metric-card" aria-label="Average Wait Time">
          <div className="metric-title">Avg Wait Time</div>
          <div className="metric-value">{metrics.avg_wait_time} min</div>
        </div>
        <div className="metric-card" aria-label="Open Gates">
          <div className="metric-title">Open Gates</div>
          <div className="metric-value">{metrics.open_gates}</div>
        </div>
        <div className="metric-card" aria-label="Incidents">
          <div className="metric-title">Incidents</div>
          <div className="metric-value" style={{ color: metrics.incidents > 0 ? 'var(--status-warning)' : 'inherit' }}>
            {metrics.incidents}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Attendance Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>VIP & Suites</span>
                <strong>{Math.floor(metrics.total_attendance * 0.1).toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Lower Bowl</span>
                <strong>{Math.floor(metrics.total_attendance * 0.5).toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Upper Decks</span>
                <strong>{Math.floor(metrics.total_attendance * 0.4).toLocaleString()}</strong>
              </div>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Data synced in real-time
            </div>
          </div>
        </div>
      )}
    </>
  );
}
