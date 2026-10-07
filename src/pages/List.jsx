import { useUsers } from '../hooks/useUsers'
import { useUsersContext } from '../context/UsersContext'
import UserCard from '../components/UserCard'
import Loader from '../components/Loader'

function List() {
  const { users, loading, error } = useUsers()
  const { removeUser, clearUsers } = useUsersContext()

  if (loading) return <Loader message="Cargando usuarios..." />

  if (error) {
    return (
      <div className="alert alert-error">
        ⚠️ Error: {error}
      </div>
    )
  }

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Usuarios</h1>
          <p className="page-subtitle">
            {users.length} {users.length === 1 ? 'usuario' : 'usuarios'} en total
          </p>
        </div>
        {users.length > 0 && (
          <button className="btn btn-ghost" onClick={clearUsers}>
            🗑️ Limpiar todo
          </button>
        )}
      </header>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No hay usuarios disponibles.</p>
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={() => removeUser(user.id)} />
          ))}
        </div>
      )}
    </section>
  )
}

export default List