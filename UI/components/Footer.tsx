export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            Built by <span className="text-white font-semibold">Ahsen Tahir</span> |
            <span className="text-purple-400"> Coral Protocol</span> +<span className="text-blue-400"> Groq</span> +
            <span className="text-green-400"> LiveKit</span>
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <div className="text-2xl">🤖</div>
            <div className="text-2xl">🎤</div>
            <div className="text-2xl">🛍️</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
