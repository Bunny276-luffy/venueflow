import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function ZoneDensity({ refreshCount }) {
  const [zones, setZones] = useState([]);

  const fetchZones = async () => {
    try {
      const res = await fetch(`${API_URL}/api/zones`);
      const data = await res.json();
      setZones(data);
    } catch (e) {
      console.error('Failed to fetch zones', e);
    }
  };

  useEffect(() => {
    fetchZones();
    const interval = setInterval(fetchZones, 10000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  return (
    <div className="zone-grid" role="region" aria-label="Zone Density Data">
      {zones.map(zone => {
        let bgColor = 'rgba(16, 185, 129, 0.2)'; // Green
        let borderColor = 'rgba(16, 185, 129, 0.4)';
        let textColor = 'var(--status-success)';

        if (zone.density_percent > 80) {
          bgColor = 'rgba(239, 68, 68, 0.2)'; // Red
          borderColor = 'rgba(239, 68, 68, 0.4)';
          textColor = 'var(--status-danger)';
        } else if (zone.density_percent >= 50) {
          bgColor = 'rgba(245, 158, 11, 0.2)'; // Amber
          borderColor = 'rgba(245, 158, 11, 0.4)';
          textColor = 'var(--status-warning)';
        }

        const isDanger = zone.density_percent > 80;

        return (
          <div 
            key={zone.name} 
            className={`zone-tile ${isDanger ? 'pulse-danger' : ''}`} 
            style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, color: textColor }}
            aria-label={`${zone.name} zone density at ${zone.density_percent} percent`}
          >
            <div className="zone-name">{zone.name}</div>
            <div className="zone-value">{zone.density_percent}%</div>
          </div>
        );
      })}
    </div>
  );
}
