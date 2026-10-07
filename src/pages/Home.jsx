import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="home">
      <div className="home-hero">
        <h1 className="home-title">
          Bienvenido a <span className="gradient-text">Mi SPA</span>
        </h1>
        <p className="home-subtitle">
          Demo de React + Vite + React Router + Axios con estado global y persistencia.
        </p>

        <div className="home-actions">
          <Link to="/list" className="btn btn-primary">
            Ver Usuarios
          </Link>
          <Link to="/form" className="btn btn-secondary">
            Crear Usuario
          </Link>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Vite</h3>
          <p>Build ultrarrápido y HMR instantáneo.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🧭</span>
          <h3>React Router</h3>
          <p>Navegación SPA sin recargas.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🌐</span>
          <h3>Axios</h3>
          <p>Consumo de API con async/await.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💾</span>
          <h3>Persistencia</h3>
          <p>Los usuarios creados sobreviven al recargar.</p>
        </div>
      </div>
    </section>
  )
}

export default Home