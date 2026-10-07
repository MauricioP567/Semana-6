import { useEffect, useState } from 'react'
import { getUsers } from '../services/api'
import { useUsersContext } from '../context/UsersContext'

/**
 * Carga usuarios desde la API SOLO si el contexto está vacío
 * (evita sobreescribir usuarios creados por el usuario).
 */
export function useUsers() {
  const { users, setAllUsers } = useUsersContext()
  const [loading, setLoading] = useState(users.length === 0)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Si ya hay usuarios en el contexto (por ejemplo, creados por el usuario), no recargar
    if (users.length > 0) {
      setLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getUsers(controller.signal)
        setAllUsers(data)
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return
        setError(err.message || 'Error al cargar usuarios')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchUsers()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { users, loading, error }
}