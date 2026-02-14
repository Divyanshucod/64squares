function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "API", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Cookies", "License"]
  };

  return (
    <footer className="w-full bg-chess-darker border-t border-chess-border/20 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="w-25 h-18 flex items-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src="/Logo-2.png" alt="Logo" className="h-full object-contain"/>
        </div>
            <p className="text-chess-text/70 text-sm leading-relaxed">
              Master chess. Join a global community of players and elevate your game.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg glassmorphic flex items-center justify-center text-chess-text hover:text-chess-light transition-colors">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glassmorphic flex items-center justify-center text-chess-text hover:text-chess-light transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glassmorphic flex items-center justify-center text-chess-text hover:text-chess-light transition-colors">
                in
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-chess-light mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-chess-text/70 hover:text-chess-light text-sm transition-colors duration-300 relative group"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-chess-text to-chess-light group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-chess-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-chess-text/60 text-sm">
          <p>
            © {currentYear} 64Squares. All rights reserved. Built for chess enthusiasts worldwide.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-chess-light transition-colors">
              System Status
            </a>
            <a href="#" className="hover:text-chess-light transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-chess-light transition-colors">
              Report Bug
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
