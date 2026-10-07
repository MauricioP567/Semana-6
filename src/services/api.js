import axios from 'axios'

// Instancia reutilizable con baseURL y timeout
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Servicio para obtener usuarios
export const getUsers = async (signal) => {
  // IA: [Evitar peticiones duplicadas en StrictMode] → Solución manual:
  // Se pasa un AbortController.signal para cancelar peticiones al desmontar.
  const { data } = await api.get('/users', { signal })
  return data
}

// Servicio para crear un usuario simulado (POST)
export const createUser = async (user) => {
  const { data } = await api.post('/users', user)
  return data
}