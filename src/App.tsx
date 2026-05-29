import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Lockpicks from './pages/Lockpicks'
import Prints from './pages/Prints'
import Links from './pages/Links'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/lockpicks" element={<Lockpicks />} />
        <Route path="/prints" element={<Prints />} />
        <Route path="/links" element={<Links />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
