import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function LiveAlerts({ refreshCount }) {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  const fetchAlerts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/alerts`);
      const data = await res.json();
      setAlerts(data);
    } catch (e) {
      console.error('Failed to fetch alerts', e);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  const handleDismiss = (id) => {
    setDismissed(prev => new Set([...prev, id]));
  };

  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));

  return (
    <div className="alert-list" role="feed" aria-label="Live System Alerts">
      {visibleAlerts.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>
          No active alerts.
        </div>
      )}
      {visibleAlerts.map(alert => {
        const time = new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return (
          <div key={alert.id} className={`alert-item ${alert.severity}`} role="article" aria-label={`Alert: ${alert.message}`}>
            <div className="msg" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span>{alert.message}</span>
              <span className="time" style={{ marginTop: '4px' }}>{time}</span>
            </div>
            <button 
              className="dismiss-btn" 
              onClick={() => handleDismiss(alert.id)}
              aria-label="Dismiss alert"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
