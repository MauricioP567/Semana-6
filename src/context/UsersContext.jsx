import { createContext, useContext, useEffect, useState } from 'react'

const UsersContext = createContext(null)

const STORAGE_KEY = 'mi-spa-users'

/**
 * Provider global que mantiene la lista de usuarios en memoria
 * y la sincroniza con localStorage para persistir entre recargas.
 */
export function UsersProvider({ children }) {
  // Inicializa desde localStorage si existe
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sincroniza automáticamente con localStorage en cada cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    } catch (err) {
      console.warn('No se pudo guardar en localStorage:', err)
    }
  }, [users])

  // Reemplaza la lista completa (al cargar desde la API)
  const setAllUsers = (apiUsers) => setUsers(apiUsers)

  // Agrega un usuario al inicio de la lista
  const addUser = (user) => setUsers((prev) => [user, ...prev])

  // Elimina por id
  const removeUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id))

  // Limpia todo
  const clearUsers = () => setUsers([])

  return (
    <UsersContext.Provider
      value={{ users, setAllUsers, addUser, removeUser, clearUsers }}
    >
      {children}
    </UsersContext.Provider>
  )
}

// Hook para consumir el contexto fácilmente
export function useUsersContext() {
  const ctx = useContext(UsersContext)
  if (!ctx) throw new Error('useUsersContext debe usarse dentro de <UsersProvider>')
  return ctx
}