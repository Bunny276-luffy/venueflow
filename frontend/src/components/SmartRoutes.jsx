import React, { useState } from 'react';

export default function SmartRoutes() {
  const [activeRoute, setActiveRoute] = useState(null);

  const routes = [
    { id: 1, name: "Gate C to Section 102", type: "Fastest", time: "5 min", steps: ["Enter Gate C", "Take Escalator A to Level 2", "Walk straight down North Concourse", "Arrive Section 102"] },
    { id: 2, name: "Gate A to North Concourse", type: "Accessible", time: "8 min", steps: ["Enter Gate A (Ramp access)", "Take Elevator 3 to Level 2", "Exit left towards North Hall", "Arrive North Concourse"] },
    { id: 3, name: "Gate F to Central Hub", type: "Slow", time: "15 min", steps: ["Enter Gate F", "Walk through East plaza", "Stop at Merch stand (delay)", "Proceed to Central Hub"] }
  ];

  return (
    <>
      <div className="routes-list" role="list" aria-label="Recommended Routes">
        {routes.map(route => (
          <div key={route.id} className="route-item" role="listitem" onClick={() => setActiveRoute(route)}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{route.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Est. time: {route.time}
              </div>
            </div>
            <span className={`route-badge ${route.type.toLowerCase()}`}>
              {route.type}
            </span>
          </div>
        ))}
      </div>

      {activeRoute && (
        <div className="modal-overlay" onClick={() => setActiveRoute(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveRoute(null)}>×</button>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`route-badge ${activeRoute.type.toLowerCase()}`} style={{ fontSize: '0.6rem' }}>{activeRoute.type}</span>
              Directions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
              {activeRoute.steps.map((step, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-1.45rem', top: '0.2rem', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-teal)', border: '2px solid var(--bg-panel)' }}></div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Step {idx + 1}</span>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginTop: '0.2rem' }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
