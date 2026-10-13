from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models import Camino, Etapa
from app.route_schemas import CaminoResponse, EtapaResponse

router = APIRouter(prefix="/api/routes", tags=["Caminos"])


@router.get("", response_model=list[CaminoResponse])
def list_routes(db: Session = Depends(get_db)) -> list[Camino]:
    """Devuelve los caminos guardados y sus etapas."""
    statement = select(Camino).options(selectinload(Camino.stages)).order_by(
        Camino.name
    )
    return list(db.scalars(statement).all())


@router.get("/{route_id}/stages", response_model=list[EtapaResponse])
def list_route_stages(
    route_id: int,
    db: Session = Depends(get_db),
) -> list[Etapa]:
    """Devuelve las etapas de un camino, ordenadas por número."""
    route_exists = db.get(Camino, route_id)
    if route_exists is None:
        raise HTTPException(status_code=404, detail="No se encontró el camino.")

    statement = (
        select(Etapa)
        .where(Etapa.camino_id == route_id)
        .order_by(Etapa.stage_number)
    )
    return list(db.scalars(statement).all())
