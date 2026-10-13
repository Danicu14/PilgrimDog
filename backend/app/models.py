from sqlalchemy import Float, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    """Base común de los modelos SQLAlchemy."""


class Camino(Base):
    __tablename__ = "caminos"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)

    stages: Mapped[list["Etapa"]] = relationship(
        back_populates="camino",
        cascade="all, delete-orphan",
        order_by="Etapa.stage_number",
    )


class Etapa(Base):
    __tablename__ = "etapas"
    __table_args__ = (
        UniqueConstraint("camino_id", "stage_number", name="uq_etapa_camino_numero"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    camino_id: Mapped[int] = mapped_column(
        ForeignKey("caminos.id", ondelete="CASCADE"),
        index=True,
    )
    stage_number: Mapped[int]
    name: Mapped[str] = mapped_column(String(160))
    start_point: Mapped[str] = mapped_column(String(120))
    end_point: Mapped[str] = mapped_column(String(120))
    distance_km: Mapped[float] = mapped_column(Float)
    estimated_hours: Mapped[float] = mapped_column(Float)
    difficulty: Mapped[str] = mapped_column(String(20))
    dog_recommendations: Mapped[str] = mapped_column(String(1000))

    camino: Mapped[Camino] = relationship(back_populates="stages")
