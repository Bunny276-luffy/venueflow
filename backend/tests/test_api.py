import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "VenueFlow API is running"}

def test_get_metrics():
    response = client.get("/api/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "total_attendance" in data
    assert "avg_wait_time" in data
    assert "open_gates" in data
    assert "incidents" in data

def test_get_gates():
    response = client.get("/api/gates")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "name" in data[0]
    assert "wait_time_minutes" in data[0]
    assert "congestion_percent" in data[0]

def test_get_zones():
    response = client.get("/api/zones")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "name" in data[0]
    assert "density_percent" in data[0]
