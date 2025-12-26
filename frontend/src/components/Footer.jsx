function Footer() {
  return (
    <footer className="bg-secondary text-cream-dark px-4 py-6 mt-auto animate-up delay-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
        <div>
          <h3 className="font-serif text-accent text-sm mb-2">About Us</h3>
          <p className="text-cream-dark/70 leading-relaxed">
            Digital Electronics System - A platform for college students to learn digital electronics.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-accent text-sm mb-2">Contact</h3>
          <p className="text-cream-dark/70">📧 info@des.edu</p>
          <p className="text-cream-dark/70">📞 +91 98765 43210</p>
        </div>
        <div>
          <h3 className="font-serif text-accent text-sm mb-2">Links</h3>
          <a href="#" className="block text-cream-dark/70 hover:text-accent">Resources</a>
          <a href="#" className="block text-cream-dark/70 hover:text-accent">Lab Manual</a>
        </div>
      </div>
      <div className="border-t border-cream-dark/20 pt-3 text-center text-xs text-cream-dark/50">
        © 2024 Digital Electronics System
      </div>
    </footer>
  )
}

export default Footer
