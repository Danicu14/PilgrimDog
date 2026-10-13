import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [apiStatus, setApiStatus] = useState("loading");
  const [apiMessage, setApiMessage] = useState("");
  const [routesStatus, setRoutesStatus] = useState("loading");
  const [routes, setRoutes] = useState([]);
  const [routesError, setRoutesError] = useState("");

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch(`${apiUrl}/api/health`);

        if (!response.ok) {
          throw new Error(`La API respondió con el estado ${response.status}.`);
        }

        const data = await response.json();
        setApiMessage(data.message);
        setApiStatus("connected");
      } catch (error) {
        setApiMessage(
          error instanceof TypeError
            ? "No se pudo conectar con FastAPI. Comprueba que el backend está en ejecución."
            : error.message,
        );
        setApiStatus("error");
      }
    }

    checkApi();
  }, []);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const response = await fetch(`${apiUrl}/api/routes`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || `La API respondió con el estado ${response.status}.`,
          );
        }

        setRoutes(data);
        setRoutesStatus("loaded");
      } catch (error) {
        setRoutesError(
          error instanceof TypeError
            ? "No se pudo conectar con FastAPI. Comprueba que el backend está en ejecución."
            : error.message,
        );
        setRoutesStatus("error");
      }
    }

    loadRoutes();
  }, []);

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="CaminoConPerro, inicio">
          <img src="/Logo.png" alt="" className="brand-logo" />
          <span>Camino<span className="brand-highlight">ConPerro</span></span>
        </a>
        <span className="topbar-note">Un camino para compartir</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">TU PRÓXIMA AVENTURA, JUNTOS</p>
          <h1>El Camino se disfruta más <span>en buena compañía.</span></h1>
          <p className="intro">
            Prepara el Camino de Santiago con tu perro: una aventura de rutas,
            descanso y recuerdos para compartir.
          </p>
          <a className="primary-link" href="#sobre-el-proyecto">
            Descubre el proyecto <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src="/Logo.png" alt="" />
          <span className="shell shell-one">✳</span>
          <span className="shell shell-two">✳</span>
          <span className="trail-dot dot-one" />
          <span className="trail-dot dot-two" />
          <span className="trail-dot dot-three" />
        </div>
      </section>

      <section className="project-card" id="sobre-el-proyecto">
        <div>
          <p className="eyebrow">CAMINOCONPERRO</p>
          <h2>Un proyecto que empieza paso a paso</h2>
          <p>
            Consulta los caminos y las etapas que se hayan registrado en la
            aplicación. Los datos se guardan en MySQL, no se muestran ejemplos
            inventados.
          </p>
        </div>
        <div className={`api-status api-status-${apiStatus}`} role="status">
          <span className="status-indicator" />
          <div>
            <strong>
              {apiStatus === "loading" && "Comprobando el backend…"}
              {apiStatus === "connected" && "Backend conectado"}
              {apiStatus === "error" && "Backend no disponible"}
            </strong>
            <span>
              {apiStatus === "connected"
                ? apiMessage
                : apiStatus === "error"
                  ? apiMessage
                  : "Consultando la API de CaminoConPerro"}
            </span>
          </div>
        </div>
      </section>

      <section className="routes-section" aria-labelledby="routes-heading">
        <div className="routes-heading">
          <div>
            <p className="eyebrow">EMPIEZA A PLANIFICAR</p>
            <h2 id="routes-heading">Caminos disponibles</h2>
          </div>
          <span className="routes-count">
            {routesStatus === "loaded" ? `${routes.length} caminos` : "Catálogo"}
          </span>
        </div>

        {routesStatus === "loading" && (
          <p className="routes-message" role="status">
            Cargando caminos…
          </p>
        )}

        {routesStatus === "error" && (
          <p className="routes-message routes-message-error" role="status">
            No se pudo cargar el catálogo: {routesError}
          </p>
        )}

        {routesStatus === "loaded" && routes.length === 0 && (
          <p className="routes-message">
            Todavía no hay caminos registrados. Cuando se añadan a la base de
            datos, aparecerán aquí.
          </p>
        )}

        {routesStatus === "loaded" && routes.length > 0 && (
          <div className="route-grid">
            {routes.map((route) => (
              <article className="route-card" key={route.id}>
                <span className="route-card-icon" aria-hidden="true">⌁</span>
                <h3>{route.name}</h3>
                <p>{route.description || "Sin descripción disponible."}</p>
                <details className="route-stages">
                  <summary>
                    Consultar {route.stages.length}{" "}
                    {route.stages.length === 1 ? "etapa" : "etapas"}
                  </summary>
                  {route.stages.length === 0 ? (
                    <p className="stage-empty">Todavía no hay etapas registradas.</p>
                  ) : (
                    <ol className="stage-list">
                      {route.stages.map((stage) => (
                        <li key={stage.id}>
                          <h4>
                            Etapa {stage.stage_number}: {stage.name}
                          </h4>
                          <p>
                            {stage.start_point} → {stage.end_point}
                          </p>
                          <p className="stage-facts">
                            {stage.distance_km} km · {stage.estimated_hours} h ·{" "}
                            {stage.difficulty}
                          </p>
                          <p className="stage-recommendation">
                            {stage.dog_recommendations}
                          </p>
                        </li>
                      ))}
                    </ol>
                  )}
                </details>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>CaminoConPerro</span>
        <span>Un proyecto intermodular · DAM</span>
      </footer>
    </main>
  );
}

export default App;
