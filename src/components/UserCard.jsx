function UserCard({ user, children, onDelete }) {
  // Iniciales para el avatar
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Color pseudoaleatorio basado en el nombre (siempre el mismo para el mismo nombre)
  const hue = [...user.name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360

  return (
    <article className="user-card">
      <div
        className="user-avatar"
        style={{
          background: `hsl(${hue}, 60%, 45%)`,
        }}
      >
        {initials}
      </div>

      <h3 className="user-name">{user.name}</h3>

      <ul className="user-info">
        <li>📧 {user.email}</li>
        <li>🌐 {user.website}</li>
        <li>🏢 {user.company?.name}</li>
      </ul>

      {children}

      {onDelete && (
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Eliminar
        </button>
      )}
    </article>
  )
}

export default UserCard