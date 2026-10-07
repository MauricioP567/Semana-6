import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProfessional } from '../services/api'
import { useProfessionalsContext } from '../context/ProfessionalsContext'
import { CATEGORIES } from '../data/categories'

function Publish() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    specialty: '',
    category: 'desarrollo',
    hourlyRate: '',
    location: 'Lima, Perú',
    bio: '',
  })
  const [status, setStatus] = useState({ type: null, message: '' })
  const [sending, setSending] = useState(false)
  const [nameError, setNameError] = useState('')

  const { addProfessional } = useProfessionalsContext()
  const navigate = useNavigate()

  // ✅ Regla: solo letras (incluye tildes, ñ) y espacios
  // Bloquea números, símbolos y emojis
  const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/

  /**
   * Valida el nombre en tiempo real:
   * - Rechaza si contiene números o caracteres especiales
   */
  const validateName = (value) => {
    if (!value) {
      setNameError('')
      return true
    }
    if (!NAME_REGEX.test(value)) {
      setNameError('❌ El nombre solo puede contener letras y espacios.')
      return false
    }
    if (value.trim().length < 3) {
      setNameError('⚠️ El nombre debe tener al menos 3 caracteres.')
      return false
    }
    setNameError('')
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Validación específica para el campo "name"
    if (name === 'name') {
      // Bloquea la escritura de caracteres no permitidos
      if (!NAME_REGEX.test(value)) {
        setNameError('❌ El nombre solo puede contener letras y espacios.')
        // Aun así actualizamos el estado para que el usuario vea su intento
        // y corrija, pero marcamos error visual
        setForm((prev) => ({ ...prev, name: value }))
        return
      }
      validateName(value)
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Previene que se peguen números con Ctrl+V
   * (doble barrera de seguridad)
   */
  const handleNamePaste = (e) => {
    const pasted = e.clipboardData.getData('text')
    if (!NAME_REGEX.test(pasted)) {
      e.preventDefault()
      setNameError('❌ No puedes pegar números ni caracteres especiales.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus({ type: null, message: '' })

    try {
      // 🔒 Validaciones estrictas antes de enviar
      if (!form.name.trim() || !form.email.trim() || !form.specialty.trim()) {
        throw new Error('Nombre, email y especialidad son obligatorios')
      }

      // Validación del nombre (letras solamente)
      if (!NAME_REGEX.test(form.name)) {
        throw new Error('El nombre solo puede contener letras y espacios')
      }
      if (form.name.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres')
      }

      // Validación de tarifa
      if (form.hourlyRate && Number(form.hourlyRate) < 1) {
        throw new Error('La tarifa debe ser mayor a 0')
      }

      await createProfessional(form)

      const newProfessional = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email,
        website: 'pendiente',
        phone: '—',
        specialty: form.specialty,
        category: form.category,
        rating: '5.0',
        hourlyRate: Number(form.hourlyRate) || 30,
        location: form.location,
        available: true,
        projects: 0,
        skills: ['Nuevo'],
        bio: form.bio || 'Profesional recién incorporado a WorkConnect.',
      }

      addProfessional(newProfessional)
      setStatus({ type: 'success', message: `✅ Perfil de "${newProfessional.name}" publicado.` })
      setForm({
        name: '', email: '', specialty: '', category: 'desarrollo',
        hourlyRate: '', location: 'Lima, Perú', bio: '',
      })
      setNameError('')

      setTimeout(() => navigate('/profesionales'), 1400)
    } catch (err) {
      setStatus({ type: 'error', message: `❌ ${err.message}` })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="form-section">
      <header className="page-header">
        <div>
          <h1>Publica tu perfil profesional</h1>
          <p className="page-subtitle">
            Únete a la red y conecta con clientes que buscan tu talento.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <label className="form-field">
            <span>Nombre completo *</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onPaste={handleNamePaste}
              placeholder="Ej: Ana Quispe"
              required
              className={nameError ? 'input-error' : ''}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? 'name-error' : undefined}
            />
            {/* Mensaje de error en tiempo real */}
            {nameError && (
              <small id="name-error" className="field-error">
                {nameError}
              </small>
            )}
          </label>

          <label className="form-field">
            <span>Email profesional *</span>
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="ana@workconnect.pe" required
            />
          </label>

          <label className="form-field">
            <span>Especialidad *</span>
            <input
              type="text" name="specialty" value={form.specialty}
              onChange={handleChange} placeholder="Ej: Desarrollador Full Stack" required
            />
          </label>

          <label className="form-field">
            <span>Categoría</span>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Tarifa por hora (USD)</span>
            <input
              type="number" name="hourlyRate" value={form.hourlyRate}
              onChange={handleChange} placeholder="45" min="1"
            />
          </label>

          <label className="form-field">
            <span>Ubicación</span>
            <input
              type="text" name="location" value={form.location}
              onChange={handleChange} placeholder="Lima, Perú"
            />
          </label>
        </div>

        <label className="form-field">
          <span>Bio profesional</span>
          <textarea
            name="bio" value={form.bio} onChange={handleChange}
            rows="3" placeholder="Cuéntanos sobre tu experiencia, tecnologías y proyectos…"
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={sending || !!nameError}
        >
          {sending ? 'Publicando…' : '🚀 Publicar perfil'}
        </button>

        {status.type && (
          <div className={`alert alert-${status.type}`}>{status.message}</div>
        )}
      </form>
    </section>
  )
}

export default Publish