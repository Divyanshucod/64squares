function Hero() {
  const features = [
    {
      title: "Real-Time Battles",
      description: "Play against opponents worldwide in real-time matches",
      icon: "⚡"
    },
    {
      title: "Smart Analytics",
      description: "Track your performance with detailed game analysis",
      icon: "📊"
    },
    {
      title: "Skill Levels",
      description: "Play at your level and improve gradually",
      icon: "📈"
    },
    {
      title: "Community",
      description: "Join tournaments and compete with global players",
      icon: "👥"
    }
  ];

  return (
    <section className="min-h-screen w-full bg-chess-darker py-20 px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-linear-to-l from-chess-text/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-linear-to-r from-chess-text/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-chess-light mb-6">
            Why Choose 64Squares?
          </h2>
          <p className="text-xl text-chess-text/80 max-w-2xl mx-auto">
            Experience the ultimate chess platform with cutting-edge features and a vibrant community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glassmorphic p-8 rounded-xl glow-effect hover:shadow-2xl hover:shadow-chess-light/20 transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-chess-light mb-3">
                {feature.title}
              </h3>
              <p className="text-chess-text/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center glassmorphic-light p-12 rounded-2xl glow-effect">
          <h3 className="text-3xl font-bold text-chess-light mb-4">
            Ready to Elevate Your Chess Game?
          </h3>
          <p className="text-chess-text/80 mb-8 text-lg">
            Join thousands of players already competing on 64Squares
          </p>
          <button className="px-10 py-4 bg-linear-to-r from-chess-text to-chess-light text-chess-darker font-bold rounded-lg hover:shadow-xl hover:shadow-chess-light/30 transition-all duration-300 hover:-translate-y-1 text-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
