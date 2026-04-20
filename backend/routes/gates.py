from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class GateResponse(BaseModel):
    name: str
    wait_time_minutes: int
    congestion_percent: int
    status: str

@router.get("/gates", response_model=list[GateResponse])
def get_gates():
    """
    Returns a list of gates with their current wait times and congestion stats.
    Returns realistic mock data.
    """
    gates_data = []
    names = ["Gate A", "Gate B", "Gate C", "Gate D", "Gate E", "Gate F", "Gate G"]
    for name in names:
        wait = random.randint(3, 14)
        congestion = min(100, int((wait / 14) * 100))
        status = "Open"
        if wait > 12:
            status = "Warning"
            if random.random() > 0.9:
                status = "Closed"
        
        gates_data.append(GateResponse(
            name=name,
            wait_time_minutes=wait,
            congestion_percent=congestion,
            status=status
        ))
    return gates_data
