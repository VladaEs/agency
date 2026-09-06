import Home from '@/components/Pages/Home/Home'
import Contact from '@/components/Pages/Contact/Contact';
import Projects from '@/components/Pages/Projects/Projects';
import {Routes, Route } from 'react-router-dom';
import useVisitLogger from '@/hooks/useVisitLogger'
import useGoogleTag from '@/hooks/useGoogleTag'

function App() {
  useGoogleTag()
  useVisitLogger()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  )
}

export default App;
