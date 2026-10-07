import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-text">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        ← Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound