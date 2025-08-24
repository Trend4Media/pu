'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import AnimatedCounter from '@/components/AnimatedCounter'
import ParallaxStars from '@/components/ParallaxStars'
import FeatureCard from '@/components/FeatureCard'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const races = [
    {
      name: "Humans",
      emoji: "👨‍🚀",
      bonus: "Forschung +20%",
      description: "Vielseitige Forscher mit schneller Technologie-Entwicklung",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Zephyrians",
      emoji: "🌪️", 
      bonus: "Kampf +15%",
      description: "Kriegerische Rasse mit überlegenen Kampffähigkeiten",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Crystalline",
      emoji: "💎",
      bonus: "Technologie +25%",
      description: "Hochentwickelte Wesen mit kristalliner Intelligenz",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Mechanoids",
      emoji: "🤖",
      bonus: "Industrie +20%",
      description: "Mechanische Lebensformen mit industrieller Effizienz",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Void Born",
      emoji: "🌌",
      bonus: "Kriegsführung +30%",
      description: "Mysteriöse Wesen aus dem Weltraum mit tödlichen Fähigkeiten",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const features = [
    {
      icon: "🌌",
      title: "500+ Planeten",
      description: "Riesiges prozedural generiertes Universum zum Erkunden"
    },
    {
      icon: "⚔️",
      title: "Epische Schlachten",
      description: "Strategische Kämpfe mit Flotten und Bodentruppen"
    },
    {
      icon: "🔬",
      title: "Forschungsbaum",
      description: "Entwickle Technologien und schalte neue Möglichkeiten frei"
    },
    {
      icon: "🤝",
      title: "Allianzen",
      description: "Verbünde dich mit anderen Spielern für gemeinsame Ziele"
    },
    {
      icon: "💰",
      title: "8 Ressourcen",
      description: "Komplexes Wirtschaftssystem mit Handel und Diplomatie"
    },
    {
      icon: "🏰",
      title: "Kolonien",
      description: "Baue und verwalte dein galaktisches Imperium"
    }
  ]

  const screenshots = [
    {
      title: "Universum-Explorer",
      description: "Erkunde Tausende von Planeten",
      image: "🌌"
    },
    {
      title: "Rassen-Auswahl",
      description: "Wähle deine Spezies mit einzigartigen Boni",
      image: "🧬"
    },
    {
      title: "Game Dashboard",
      description: "Verwalte dein Imperium mit detaillierten Statistiken",
      image: "📊"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % races.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [races.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative">
      {/* Animated Stars Background */}
      <ParallaxStars />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                🌌 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Space Conquest</span>
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                  Features
                </a>
                <a href="#races" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                  Rassen
                </a>
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors">
                  Anmelden
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105">
                  Jetzt Spielen
                </Link>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/60 backdrop-blur-md">
              <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
                Features
              </a>
              <a href="#races" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
                Rassen
              </a>
              <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md font-medium">
                Anmelden
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-3 py-2 rounded-md font-medium">
                Jetzt Spielen
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                🚀 Jetzt Live - 100% Kostenlos
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Erobere das <br/>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Universum
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Das ultimative strategische Browsergame im Weltraum. Wähle deine Rasse, 
              erforsche über <span className="text-purple-400 font-semibold">500 Planeten</span>, 
              baue dein Imperium auf und führe epische Schlachten gegen andere Spieler.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                🚀 Kostenlos Spielen
              </Link>
              <Link 
                href="/login" 
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-10 py-4 rounded-lg text-xl font-semibold transition-all"
              >
                Bereits registriert?
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:bg-white/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-gray-300 text-sm">Planeten</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:bg-white/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">
                  <AnimatedCounter end={5} />
                </div>
                <div className="text-gray-300 text-sm">Rassen</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:bg-white/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  <AnimatedCounter end={8} />
                </div>
                <div className="text-gray-300 text-sm">Ressourcen</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:bg-white/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-orange-400">∞</div>
                <div className="text-gray-300 text-sm">Möglichkeiten</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Spielfeatures
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Entdecke die Vielfalt des Space Conquest Universums mit seinen einzigartigen Features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Races Section */}
      <div id="races" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Wähle deine Rasse
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Jede Rasse hat einzigartige Stärken und Boni. Welche passt zu deiner Strategie?
            </p>
          </div>

          {/* Race Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {races.map((race, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className={`bg-gradient-to-br ${race.color} p-8 md:p-12 text-white text-center`}>
                      <div className="text-8xl md:text-9xl mb-6">{race.emoji}</div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{race.name}</h3>
                      <div className="text-xl md:text-2xl font-semibold mb-4 bg-black/20 rounded-full px-6 py-2 inline-block">
                        {race.bonus}
                      </div>
                      <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        {race.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {races.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-purple-500 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All races grid */}
          <div className="grid md:grid-cols-5 gap-4 mt-16">
            {races.map((race, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${race.color} p-6 rounded-xl text-white text-center cursor-pointer transition-all hover:scale-105 ${
                  index === currentSlide ? 'ring-4 ring-white/50' : ''
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="text-4xl mb-2">{race.emoji}</div>
                <h4 className="font-bold">{race.name}</h4>
                <p className="text-sm opacity-90">{race.bonus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Gameplay Preview
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Erlebe das Space Conquest Interface und seine Features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 text-center hover:bg-white/10 transition-all">
                <div className="text-6xl mb-6">{screenshot.image}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{screenshot.title}</h3>
                <p className="text-gray-300">{screenshot.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Was Spieler sagen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:bg-white/10 transition-all">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Endlich ein Strategiespiel, das Tiefe mit Zugänglichkeit verbindet. Die verschiedenen Rassen machen jedes Spiel einzigartig!"
              </p>
              <div className="text-white font-semibold">- Commander Alex</div>
              <div className="text-gray-500 text-sm">Veteran Spieler seit 2024</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:bg-white/10 transition-all">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Das Universum ist riesig und es gibt immer etwas Neues zu entdecken. Perfect für Strategie-Fans!"
              </p>
              <div className="text-white font-semibold">- Captain Sarah</div>
              <div className="text-gray-500 text-sm">Allianz-Führerin</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:bg-white/10 transition-all">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-6 italic">
                "Die Allianzen und politischen Aspekte machen das Spiel zu einem echten sozialen Erlebnis!"
              </p>
              <div className="text-white font-semibold">- Admiral Mike</div>
              <div className="text-gray-500 text-sm">Meta-Allianz Gründer</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Häufige Fragen
            </h2>
            <p className="text-gray-300 text-xl">
              Alles was du über Space Conquest wissen musst
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">🆓 Ist das Spiel wirklich kostenlos?</h3>
              <p className="text-gray-300">
                Ja, Space Conquest ist 100% kostenlos spielbar. Es gibt keine versteckten Kosten, 
                Premium-Accounts oder Pay-to-Win Mechaniken. Alle Features stehen allen Spielern zur Verfügung.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">📱 Kann ich auf dem Handy spielen?</h3>
              <p className="text-gray-300">
                Absolut! Das Spiel ist vollständig responsive und funktioniert perfekt auf Smartphones, 
                Tablets und Desktop-Computern. Kein Download erforderlich - einfach im Browser spielen.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">⏰ Wie zeitaufwändig ist das Spiel?</h3>
              <p className="text-gray-300">
                Space Conquest ist darauf ausgelegt, dass du es in deinem eigenen Tempo spielen kannst. 
                Du kannst 10 Minuten am Tag spielen oder stundenlang strategisch planen - beides funktioniert.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">🤝 Wie funktionieren Allianzen?</h3>
              <p className="text-gray-300">
                Allianzen ermöglichen es Spielern, zusammenzuarbeiten, Ressourcen zu teilen, 
                gemeinsame Forschung zu betreiben und koordinierte Angriffe zu planen. 
                Du kannst auch Meta-Allianzen bilden für noch größere strategische Vorteile.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">🎮 Brauche ich Vorerfahrung mit Strategiespielen?</h3>
              <p className="text-gray-300">
                Nein! Das Spiel ist anfängerfreundlich gestaltet mit einem Tutorial und schrittweisen 
                Einführungen in die verschiedenen Systeme. Gleichzeitig bietet es genug Tiefe für erfahrene Strategen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bereit für die Eroberung?
          </h2>
          <p className="text-gray-300 text-xl mb-8 leading-relaxed">
            Tritt der galaktischen Gemeinschaft bei und beginne dein Abenteuer im Weltraum. 
            Registriere dich jetzt kostenlos und starte deine Herrschaft über die Sterne!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/register" 
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              🚀 Jetzt Kostenlos Starten
            </Link>
            <Link 
              href="/login" 
              className="inline-block border-2 border-white/30 text-white hover:bg-white hover:text-purple-900 px-12 py-4 rounded-lg text-xl font-semibold transition-all"
            >
              Bereits Spieler? Login
            </Link>
          </div>

          <div className="text-gray-400 text-sm">
            ✅ 100% Kostenlos • ✅ Keine Downloads • ✅ Direkt im Browser spielen
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">🌌 Space Conquest</h3>
              <p className="text-gray-400 text-sm">
                Das ultimative strategische Browsergame im Weltraum. Erobere Planeten, 
                führe Allianzen und herrsche über die Galaxie.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Spiel</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/register" className="hover:text-white transition-colors">Registrieren</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Anmelden</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#races" className="hover:text-white transition-colors">Rassen</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Space Conquest Game. Ein strategisches Browsergame für Weltraum-Eroberer.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}