from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class ZoneResponse(BaseModel):
    name: str
    density_percent: int

@router.get("/zones", response_model=list[ZoneResponse])
def get_zones():
    """
    Returns density percentage for predefined venue zones.
    Returns realistic mock data.
    """
    zones_data = []
    zone_names = ["North", "East", "West", "South", "Central", "Concourse"]
    for name in zone_names:
        zones_data.append(ZoneResponse(
            name=name,
            density_percent=random.randint(10, 95)
        ))
    return zones_data
