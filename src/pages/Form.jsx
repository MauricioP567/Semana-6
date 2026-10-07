import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../services/api'
import { useUsersContext } from '../context/UsersContext'

function Form() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    website: '',
    company: '',
  })
  const [status, setStatus] = useState({ type: null, message: '' })
  const [sending, setSending] = useState(false)

  const { addUser } = useUsersContext()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: null, message: '' })

    try {
      if (!form.name.trim() || !form.email.trim()) {
        throw new Error('Nombre y email son obligatorios')
      }

      // POST a la API (mock). La API devuelve el usuario con id simulado.
      const created = await createUser(form)

      // Construimos el usuario con la estructura que espera UserCard
      const newUser = {
        id: created.id ?? Date.now(), // fallback si la API no devuelve id
        name: form.name,
        email: form.email,
        website: form.website || 'sin sitio',
        company: { name: form.company || 'Sin empresa' },
      }

      // ✅ Guardamos en el contexto global → aparece en /list y persiste
      addUser(newUser)

      setStatus({
        type: 'success',
        message: `✅ Usuario "${newUser.name}" creado correctamente.`,
      })
      setForm({ name: '', email: '', website: '', company: '' })

      // Redirige a la lista después de 1.2s para que se vea el mensaje
      setTimeout(() => navigate('/list'), 1200)
    } catch (err) {
      setStatus({ type: 'error', message: `❌ ${err.message}` })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="form-section">
      <header className="page-header">
        <h1>Crear Usuario</h1>
        <p className="page-subtitle">
          El usuario se agregará a la lista y persistirá en tu navegador.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre *</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Ana Pérez"
              required
            />
          </label>

          <label className="form-field">
            <span>Email *</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ana@example.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Sitio web</span>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="ana.dev"
            />
          </label>

          <label className="form-field">
            <span>Empresa</span>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Corp"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Enviando…' : 'Crear Usuario'}
        </button>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}
      </form>
    </section>
  )
}

export default Form