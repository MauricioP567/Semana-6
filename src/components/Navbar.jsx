import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link-active' : ''}`

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">⚛️</span>
        <span>Mi SPA</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>Inicio</NavLink>
        <NavLink to="/list" className={linkClass}>Usuarios</NavLink>
        <NavLink to="/form" className={linkClass}>Crear</NavLink>
      </div>
    </nav>
  )
}

export default Navbar