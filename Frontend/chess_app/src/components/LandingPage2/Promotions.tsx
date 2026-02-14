function Promotions() {
  const promotions = [
    {
      title: "Welcome Bonus",
      description: "Get 100 free rating points when you create your account",
      badge: "New Players"
    },
    {
      title: "Monthly Tournaments",
      description: "Compete in weekly tournaments with exclusive prizes",
      badge: "Prize Pool"
    },
    {
      title: "Premium Membership",
      description: "Unlock unlimited lessons and advanced analytics",
      badge: "Premium"
    },
    {
      title: "Referral Program",
      description: "Earn rewards by inviting friends to join",
      badge: "Rewards"
    }
  ];

  return (
    <section className="min-h-screen w-full bg-chess-dark py-20 px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-linear-to-b from-chess-text/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-linear-to-t from-chess-text/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-chess-light mb-6">
            Special Promotions
          </h2>
          <p className="text-xl text-chess-text/80 max-w-2xl mx-auto">
            Take advantage of our exclusive offers and unlock amazing benefits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {promotions.map((promo, idx) => (
            <div
              key={idx}
              className="glassmorphic-light p-8 rounded-2xl glow-effect hover:shadow-2xl hover:shadow-chess-light/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-chess-text/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-chess-light">
                    {promo.title}
                  </h3>
                  <span className="px-4 py-2 bg-chess-text/20 backdrop-blur text-chess-light text-sm font-semibold rounded-full border border-chess-border/30">
                    {promo.badge}
                  </span>
                </div>
                
                <p className="text-chess-text/80 text-lg mb-6">
                  {promo.description}
                </p>
                
                <button className="w-full px-6 py-3 border-2 border-chess-text/50 text-chess-text font-semibold rounded-lg hover:border-chess-text hover:bg-chess-text/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured promotion */}
        <div className="mt-16 glassmorphic p-12 rounded-2xl glow-effect border-2 border-chess-text/30">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-chess-light mb-4">
                🏆 Championship Series
              </h3>
              <p className="text-chess-text/80 text-lg mb-6">
                Compete in our exclusive championship series and win prizes worth thousands. 
                Top players get ranked badges, monetary rewards, and exclusive tournament access.
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-chess-text to-chess-light text-chess-darker font-bold rounded-lg hover:shadow-xl hover:shadow-chess-light/30 transition-all duration-300 hover:-translate-y-1">
                Join Championship
              </button>
            </div>
            <div className="relative h-80 bg-linear-to-br from-chess-gray to-chess-dark rounded-xl border border-chess-border/30 flex items-center justify-center glow-effect">
              <div className="text-center">
                <div className="text-7xl mb-4">♚</div>
                <p className="text-chess-text/70 text-lg font-mono">Championship Series</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Promotions;
