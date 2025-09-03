import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WindsurfPartnerLanding from './windsurfpartnerlanding'
import TreinamentoPage from './treinamento'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WindsurfPartnerLanding />} />
        <Route path="/treinamento" element={<TreinamentoPage />} />
      </Routes>
    </Router>
  )
}

export default App
