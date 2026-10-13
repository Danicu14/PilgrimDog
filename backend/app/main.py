import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router as routes_router
from app.schemas import HealthResponse

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

app = FastAPI(
    title="CaminoConPerro API",
    description="API inicial para la aplicación CaminoConPerro.",
    version="0.1.0",
)

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_router)


@app.get("/api/health")
def health_check() -> HealthResponse:
    """Confirma que la API está en funcionamiento."""
    return HealthResponse(
        status="ok",
        message="La API de CaminoConPerro está funcionando.",
    )
