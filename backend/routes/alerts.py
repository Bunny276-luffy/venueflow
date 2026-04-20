from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import random
from datetime import datetime, timedelta

router = APIRouter()

class AlertResponse(BaseModel):
    id: int
    message: str
    severity: str
    timestamp: str

@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts():
    """
    Returns recent alerts with their severities.
    Returns mock data for UI display.
    """
    messages = [
        {"msg": "Overcrowding detected at Gate C.", "sev": "danger"},
        {"msg": "Gate A is now reopening.", "sev": "info"},
        {"msg": "Incident reported near South Zone.", "sev": "warning"},
        {"msg": "Please route traffic through Gate F.", "sev": "info"},
        {"msg": "Concourse density reaching 85%.", "sev": "warning"}
    ]
    
    selected_alerts = random.sample(messages, k=random.randint(2, 4))
    
    alerts_data = []
    now = datetime.now()
    for i, alert in enumerate(selected_alerts):
        alerts_data.append(AlertResponse(
            id=random.randint(1000, 9999),
            message=alert["msg"],
            severity=alert["sev"],
            timestamp=(now - timedelta(minutes=random.randint(1, 15))).isoformat()
        ))
    
    return sorted(alerts_data, key=lambda x: x.timestamp, reverse=True)
