import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '12px'
};

const stadiumCenter = {
  lat: 40.7128,
  lng: -74.0060
};

export default function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "dummy_key_to_pass_validation",
    libraries: ['places', 'visualization'] // Using Places and Visualization (Heatmap) APIs
  });

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
    ]
  }), []);

  if (!isLoaded) {
    return <div className="map-placeholder-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Google Maps...</div>;
  }

  return (
    <div style={{ position: 'relative', marginTop: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={stadiumCenter}
        zoom={16}
        options={mapOptions}
      >
        <OverlayView
          position={stadiumCenter}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="map-marker" style={{ top: '-20px', left: '-20px' }}></div>
        </OverlayView>

        <OverlayView
          position={{ lat: 40.7135, lng: -74.0065 }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="map-marker" style={{ top: '-20px', left: '-20px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(245, 158, 11, 0) 70%)' }}></div>
        </OverlayView>
      </GoogleMap>
      <div className="overlay-badge">
        Google Maps API Live
      </div>
    </div>
  );
}
