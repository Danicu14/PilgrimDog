from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class EtapaResponse(BaseModel):
    """Información de una etapa que devuelve la API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    stage_number: int
    name: str
    start_point: str
    end_point: str
    distance_km: float = Field(ge=0)
    estimated_hours: float = Field(gt=0)
    difficulty: Literal["fácil", "moderada", "difícil"]
    dog_recommendations: str


class CaminoResponse(BaseModel):
    """Camino y resumen de sus etapas."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    stages: list[EtapaResponse]
