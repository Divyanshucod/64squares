
function Navigation(){

  return <>
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-8 py-4 text-chess-light">
      <div className="glassmorphic flex w-full items-center justify-between px-8 py-2 glow-effect">
        <div className="w-20 h-14 flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src="/Logo-2.png" alt="Logo" className="h-full object-contain"/>
        </div>
        
        <div className="flex gap-8 items-center">
          <button className="text-chess-text hover:text-chess-light transition-colors duration-300 font-medium text-sm relative group">
            Live Matches
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-chess-light to-chess-text group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="text-chess-text hover:text-chess-light transition-colors duration-300 font-medium text-sm relative group">
            Play
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-chess-light to-chess-text group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
        
        <div className="flex gap-4 items-center">
          <button 
            className="px-6 py-2 text-chess-text hover:text-chess-light font-medium text-sm transition-colors duration-300 border border-chess-border/40 rounded-lg hover:border-chess-border/80"
          >
            Login
          </button>
          <button 
            className="px-6 py-2 bg-linear-to-r from-chess-text to-chess-light text-chess-darker font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-chess-light/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  </>
}

export default Navigation;
