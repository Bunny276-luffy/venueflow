import React, { useState } from 'react';
import DashboardMetrics from './components/DashboardMetrics';
import GateCongestion from './components/GateCongestion';
import ZoneDensity from './components/ZoneDensity';
import SmartRoutes from './components/SmartRoutes';
import LiveAlerts from './components/LiveAlerts';
import MapView from './components/MapView';
import { RefreshCcw } from 'lucide-react';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshCount(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 800); // Simulate network spin
  };

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1 className="title-glow">VenueFlow</h1>
          <p style={{ color: 'var(--text-muted)' }}>Smart Stadium Coordination</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="refresh-btn" 
            onClick={handleRefresh}
            aria-label="Refresh Data"
          >
            <RefreshCcw size={16} className={isRefreshing ? 'spin-anim' : ''} />
            Refresh Data
          </button>
          
          <div className="status-indicator" role="status" aria-live="polite">
            <div className="dot"></div>
            Live Updates
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="glass-panel span-full">
          <DashboardMetrics refreshCount={refreshCount} />
        </section>

        <section className="glass-panel span-2" aria-labelledby="map-title">
          <h2 id="map-title" style={{ marginBottom: '1rem' }}>Live Crowd Map</h2>
          <MapView />
        </section>

        <section className="glass-panel" aria-labelledby="alerts-title">
          <h2 id="alerts-title">Live Alerts</h2>
          <LiveAlerts refreshCount={refreshCount} />
        </section>

        <section className="glass-panel" aria-labelledby="gates-title">
          <h2 id="gates-title">Gate Congestion</h2>
          <GateCongestion refreshCount={refreshCount} />
        </section>

        <section className="glass-panel" aria-labelledby="zones-title">
          <h2 id="zones-title">Zone Density</h2>
          <ZoneDensity refreshCount={refreshCount} />
        </section>

        <section className="glass-panel" aria-labelledby="routes-title">
          <h2 id="routes-title">Smart Routes</h2>
          <SmartRoutes />
        </section>
      </main>
    </div>
  );
}

export default App;
