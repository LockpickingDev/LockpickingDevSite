import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Lab from './pages/Lab'
import Lockpicks from './pages/Lockpicks'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/lockpicks" element={<Lockpicks />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
