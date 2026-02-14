import Navigation from "./Navigation";
import Hero from "./Hero";
import Promotions from "./Promotions";
import Footer from "./Footer";

function LandingPage(){
    return <>
      <div className="min-w-screen min-h-screen bg-chess-darker">
        <div className="main-section min-h-screen w-full flex flex-col pt-24">
          <Navigation/>
          
          <div className="flex-1 h-full w-full flex flex-col justify-center items-center px-8 relative z-10 text-white">
            <div className="text-center space-y-8 max-w-4xl">
              <div className="mainsection-text">
                <h1 className="font-mono text-6xl md:text-7xl font-bold text-chess-light mb-4 animate-fade-in">
                  64Squares
                </h1>
                <p className="font-mono text-2xl md:text-4xl text-chess-text mb-8 animate-fade-in animation-delay-200">
                  Master the Board. Master the Mind.
                </p>
                <p className="text-chess-text/70 text-lg max-w-2xl mx-auto mb-8">
                  Challenge players worldwide, sharpen your tactics, and dominate the chessboard. 
                  Experience chess like never before.
                </p>
              </div>
              
              <div className="flex gap-6 justify-center flex-wrap pt-4">
                <button className="glassmorphic px-10 py-4 text-chess-light font-semibold text-lg hover:bg-opacity-100 transition-all duration-300 glow-effect hover:shadow-xl hover:shadow-chess-light/30 hover:-translate-y-1">
                  Start Playing
                </button>
                <button className="glassmorphic-light px-10 py-4 text-chess-text font-semibold text-lg border-2 border-chess-border/50 hover:border-chess-border transition-all duration-300 hover:-translate-y-1">
                  Learn Rules
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Hero/>
        <Promotions/>
        <Footer/>
      </div>
    </>
}

export default LandingPage;
