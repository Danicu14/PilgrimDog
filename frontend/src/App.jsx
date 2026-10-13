const navItems = [
  "Inicio",
  "Etapas",
  "Alojamientos",
  "Consejos",
];

const tags = [
  "Rutas adaptadas para perros",
  "Alojamientos dog-friendly",
  "Consejos útiles y prácticos",
];

const featuredStages = [
  {
    name: "Sarria - Portomarin",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    distance: "22,4 km",
    time: "5 h 30 min",
    difficulty: "Difícil: Baja",
    label: "Ideal para empezar",
  },
  {
    name: "Portomarin - Palas de Rei",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    distance: "25,6 km",
    time: "6 h 15 min",
    difficulty: "Difícil: Media",
    label: "Naturaleza y pueblos",
  },
  {
    name: "Palas de Rei - Arzúa",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
    distance: "29,8 km",
    time: "7 h 20 min",
    difficulty: "Difícil: Media",
    label: "Bosques y encanto rural",
  },
  {
    name: "Arzúa - Santiago",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    distance: "38,2 km",
    time: "9 h 30 min",
    difficulty: "Difícil: Alta",
    label: "La última etapa",
  },
];

const lodgings = [
  {
    name: "Pensión O Camino",
    location: "Portomarín",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    rating: "4,8",
    type: "Admite perros",
  },
  {
    name: "Casa Rural A Pedreira",
    location: "Palas de Rei",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    rating: "4,6",
    type: "Admite perros",
  },
  {
    name: "Hotel Rural Arzúa",
    location: "Arzúa",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    rating: "4,7",
    type: "Admite perros",
  },
];

const tips = [
  "Hidratación",
  "Salud",
  "Que llevar",
  "Clima",
];

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand" aria-label="CaminoConPerro">
          <img src="/Logo.png" alt="" className="brand-logo" />
          <div className="brand-copy">
            <span>CaminoConPerro</span>
            <small>El Camino de Santiago también es suyo</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item} href="#" className="nav-link">
              {item}
            </a>
          ))}
        </nav>

        <div className="session-actions">
          <button className="btn btn-secondary" type="button">
            Iniciar sesión
          </button>
          <button className="btn btn-primary" type="button">
            Registrarse
          </button>
        </div>
      </header>

      <main className="content">
        <section className="hero" aria-label="Portada principal">
          <div className="hero-copy">
            <h1>
              Camino de Santiago
              <br />
              con tu perro
            </h1>
            <p>
              Descubre rutas, etapas, alojamientos y consejos para vivir una
              experiencia única junto a tu mejor compañero de viaje.
            </p>

            <div className="search-row">
              <div className="search-input-wrap">
                <span className="search-icon" aria-hidden="true">
                  ⌕
                </span>
                <input
                  type="text"
                  value="Buscar etapa, lugar o alojamiento..."
                  readOnly
                  aria-label="Buscar"
                />
              </div>
              <button type="button" className="search-button">
                Buscar
              </button>
            </div>

            <div className="quick-tags">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="dog-photo" />
            <div className="route-badge">
              <span>Juntos</span>
              <small>hasta</small>
              <strong>Santiago</strong>
              <i>✦</i>
            </div>
            <div className="shell-marker">
              <span className="shell-arrow">→</span>
            </div>
          </div>
        </section>

        <section className="section-header">
          <div className="section-title-wrap">
            <span className="title-icon">🏕</span>
            <h2>Etapas destacadas</h2>
          </div>
          <button type="button" className="link-button">
            Ver todas las etapas <span>›</span>
          </button>
        </section>

        <section className="stage-grid" aria-label="Etapas destacadas">
          {featuredStages.map((stage) => (
            <article className="stage-card" key={stage.name}>
              <div
                className="stage-image"
                style={{ backgroundImage: `url(${stage.image})` }}
              />
              <div className="stage-body">
                <h3>{stage.name}</h3>
                <ul>
                  <li>
                    <span className="meta-icon">↝</span>
                    {stage.distance}
                  </li>
                  <li>
                    <span className="meta-icon">◔</span>
                    {stage.time}
                  </li>
                  <li>
                    <span className="meta-icon">▣</span>
                    {stage.difficulty}
                  </li>
                </ul>
                <div className="stage-footer">
                  <span>{stage.label}</span>
                  <span className="chevron">›</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="info-grid">
          <article className="panel lodging-panel">
            <div className="panel-header">
              <span className="title-icon">🛏</span>
              <h3>Alojamientos dog-friendly</h3>
              <button type="button" className="link-button small">
                Ver todos <span>›</span>
              </button>
            </div>

            <div className="lodging-list">
              {lodgings.map((lodging) => (
                <div className="lodging-item" key={lodging.name}>
                  <div
                    className="lodging-image"
                    style={{ backgroundImage: `url(${lodging.image})` }}
                  />
                  <div className="lodging-info">
                    <h4>{lodging.name}</h4>
                    <p>{lodging.location}</p>
                    <span>{lodging.type}</span>
                  </div>
                  <strong>{lodging.rating}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel tips-panel">
            <div className="panel-header">
              <span className="title-icon">💡</span>
              <h3>Consejos para el Camino con perro</h3>
              <button type="button" className="link-button small">
                Ver todos <span>›</span>
              </button>
            </div>

            <div className="tips-list">
              {tips.map((tip) => (
                <div className="tip-item" key={tip}>
                  <span>{tip}</span>
                  <span className="tip-arrow">›</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/Logo.png" alt="" className="brand-logo small" />
          <div>
            <strong>CaminoConPerro</strong>
            <small>El Camino de Santiago también es suyo</small>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Navegación footer">
          {navItems.map((item) => (
            <a key={item} href="#" className="footer-link">
              {item}
            </a>
          ))}
        </nav>

        <div className="socials" aria-label="Redes sociales">
          <span>◌</span>
          <span>◍</span>
          <span>◐</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
