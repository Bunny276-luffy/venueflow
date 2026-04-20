from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import gates, zones, alerts, metrics

app = FastAPI(
    title="VenueFlow API",
    description="Backend API for VenueFlow, providing real-time stadium coordination metrics.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this should be restricted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(gates.router, prefix="/api", tags=["Gates"])
app.include_router(zones.router, prefix="/api", tags=["Zones"])
app.include_router(alerts.router, prefix="/api", tags=["Alerts"])
app.include_router(metrics.router, prefix="/api", tags=["Metrics"])

@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "ok", "message": "VenueFlow API is running"}
