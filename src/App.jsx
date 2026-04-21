import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './sections/About'
import Hero from './sections/Hero'
import Services from './sections/Services'
import SocialFeed from './sections/SocialFeed'
import StatsAndFaq from './sections/StatsAndFaq'

function App() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <StatsAndFaq />
        <SocialFeed />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
