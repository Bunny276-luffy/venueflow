import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function GateCongestion({ refreshCount }) {
  const [gates, setGates] = useState([]);
  const [detailGate, setDetailGate] = useState(null);

  const fetchGates = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gates`);
      const data = await res.json();
      setGates(data);
    } catch (e) {
      console.error('Failed to fetch gates', e);
    }
  };

  useEffect(() => {
    fetchGates();
    const interval = setInterval(fetchGates, 10000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  // Find least congested gate
  const minWait = Math.min(...gates.map(g => g.wait_time_minutes), 999);

  return (
    <>
      <div className="bar-chart-container" role="region" aria-label="Gate Congestion Data">
        {gates.map(gate => {
          const isRecommended = gate.wait_time_minutes === minWait;
          let color = 'linear-gradient(90deg, var(--accent-blue), var(--accent-teal))';
          if (gate.status === 'Closed') color = 'var(--status-danger)';
          else if (gate.wait_time_minutes > 30) color = 'var(--status-warning)';
          else if (gate.wait_time_minutes < 15) color = 'var(--status-success)';

          return (
            <div 
              className="bar-row" 
              key={gate.name} 
              aria-label={`${gate.name} wait time ${gate.wait_time_minutes} minutes`}
              onClick={() => setDetailGate(gate)}
            >
              <div className="bar-label">{gate.name}</div>
              <div className="bar-track">
                <div 
                  className="bar-fill" 
                  style={{ width: `${gate.congestion_percent}%`, background: color }}
                ></div>
              </div>
              <div className="bar-value">
                {gate.wait_time_minutes}m
                {isRecommended && <span className="rec-badge" aria-label="Recommended">Rec</span>}
              </div>
            </div>
          );
        })}
      </div>

      {detailGate && (
        <div className="modal-overlay" onClick={() => setDetailGate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetailGate(null)}>×</button>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>{detailGate.name} Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <strong style={{ color: detailGate.status === 'Closed' ? 'var(--status-danger)' : 'var(--status-success)' }}>
                  {detailGate.status}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Est. Wait Time</span>
                <strong>{detailGate.wait_time_minutes} mins</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Queue Length</span>
                <strong>~{Math.floor(detailGate.wait_time_minutes * 14.5)} people</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Staff Assigned</span>
                <strong>{Math.max(2, Math.floor(12 - (detailGate.wait_time_minutes / 5)))} checking</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
