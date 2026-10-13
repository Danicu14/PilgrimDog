from collections.abc import Generator
from functools import lru_cache
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import HTTPException, status
from sqlalchemy import URL, create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.models import Base

load_dotenv(Path(__file__).resolve().parents[1] / ".env")


def create_tables() -> None:
    """Crea las tablas que todavía no existen en la base de datos configurada."""
    engine = create_engine(_get_database_url(), pool_pre_ping=True)
    try:
        Base.metadata.create_all(bind=engine)
    finally:
        engine.dispose()


def _get_database_url() -> URL:
    """Construye la URL de conexión con la configuración local de MySQL."""
    required_variables = (
        "DATABASE_HOST",
        "DATABASE_NAME",
        "DATABASE_USER",
        "DATABASE_PASSWORD",
    )
    missing_variables = [
        name for name in required_variables if not os.getenv(name)
    ]
    if missing_variables:
        missing = ", ".join(missing_variables)
        raise RuntimeError(
            f"Faltan variables de entorno para conectar con MySQL: {missing}"
        )

    try:
        port = int(os.getenv("DATABASE_PORT", "3306"))
    except ValueError as error:
        raise RuntimeError("DATABASE_PORT debe ser un número entero.") from error

    return URL.create(
        drivername="mysql+pymysql",
        username=os.environ["DATABASE_USER"],
        password=os.environ["DATABASE_PASSWORD"],
        host=os.environ["DATABASE_HOST"],
        port=port,
        database=os.environ["DATABASE_NAME"],
        query={"charset": "utf8mb4"},
    )


@lru_cache
def _get_session_factory() -> sessionmaker[Session]:
    """Crea el motor y la fábrica de sesiones la primera vez que se necesitan."""
    engine = create_engine(_get_database_url(), pool_pre_ping=True)
    return sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    """Proporciona una sesión de base de datos y la cierra al terminar."""
    try:
        session_factory = _get_session_factory()
    except RuntimeError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error

    with session_factory() as session:
        yield session
