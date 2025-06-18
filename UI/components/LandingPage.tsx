import Navbar from "./Navbar"
import Footer from "./Footer"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Agent-Powered
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                E-Commerce
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Order faster with AI agents powered by Coral Protocol, Groq & LiveKit
            </p>
          </div>

          {/* Animation/Visual */}
          <div className="mb-12">
            <div className="relative w-80 h-80 mx-auto">
              {/* Simple animated illustration */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-30 animate-ping"></div>
              <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-6xl">🤖</div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <div className="text-2xl">🛍️</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-bounce delay-300">
                <div className="text-2xl">🎤</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/agent-interaction">
            <button className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
              Get Started
            </button>
          </Link>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-semibold mb-2">Voice Ordering</h3>
              <p className="text-gray-600">Natural voice commands powered by LiveKit</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">AI Intelligence</h3>
              <p className="text-gray-600">Smart user interaction using Groq</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Agent Communication</h3>
              <p className="text-gray-600">Seamless coordination via Coral Protocol</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
