function Footer() {
  return (
    <footer className="bg-dark text-text-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                DES
              </div>
              <span className="text-xl font-bold text-text-light">Digital Electronics</span>
            </div>
            <p className="text-text-muted-light text-sm leading-relaxed max-w-md">
              A modern platform for college students to learn, practice, and master digital electronics through interactive labs and comprehensive resources.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text-light mb-4 leading-tight">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-muted-light hover:text-text-light transition-colors text-sm leading-relaxed">Resources</a></li>
              <li><a href="#" className="text-text-muted-light hover:text-text-light transition-colors text-sm leading-relaxed">Lab Manual</a></li>
              <li><a href="#" className="text-text-muted-light hover:text-text-light transition-colors text-sm leading-relaxed">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text-light mb-4 leading-tight">Contact</h3>
            <ul className="space-y-2">
              <li className="text-text-muted-light text-sm leading-relaxed">📧 info@des.edu</li>
              <li className="text-text-muted-light text-sm leading-relaxed">📞 +91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-lighter pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-text-muted-light text-sm leading-relaxed">© 2024 Digital Electronics System. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="https://www.codehelp.in/" target="_blank" rel="noopener noreferrer" className="text-text-muted-light hover:text-text-light transition-colors text-sm">
              Inspired by CodeHelp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
