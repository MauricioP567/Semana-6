import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Form from './pages/Form'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      {/* Navbar presente en todas las rutas */}
      <Navbar />

      <main style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
        {/* Routes define qué componente renderizar según la URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          {/* Ruta comodín para 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App