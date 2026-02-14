function Button({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    return (
       <button onClick={onClick} className={`relative group p-px rounded-xl overflow-hidden ${className}`}>
  <span className="absolute inset-0 bg-linear-to-r from-white/40 via-gray-400 to-white/40 
                   opacity-0 group-hover:opacity-100 
                   animate-borderMove" />
  
  <span className="relative block px-6 py-3 rounded-xl bg-[#0B0B0D] text-white">
    {children}
  </span>
</button>
    );
}

export default Button;
