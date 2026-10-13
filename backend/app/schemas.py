from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Respuesta validada del endpoint de comprobación de la API."""

    status: Literal["ok"]
    message: str
