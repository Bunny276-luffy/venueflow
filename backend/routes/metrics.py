from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class MetricsResponse(BaseModel):
    total_attendance: int
    avg_wait_time: int
    open_gates: int
    incidents: int

@router.get("/metrics", response_model=MetricsResponse)
def get_metrics():
    """
    Returns global, top-level dashboard metrics.
    """
    return MetricsResponse(
        total_attendance=random.randint(55000, 75000),
        avg_wait_time=random.randint(7, 9),
        open_gates=random.randint(5, 7),
        incidents=random.randint(0, 3)
    )
