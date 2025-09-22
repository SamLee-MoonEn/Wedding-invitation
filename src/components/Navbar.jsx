import React, { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
  { id: 'account', label: 'Gift' },
  { id: 'info', label: 'Info' },
  { id: 'guestbook', label: 'Guestbook' },
]

export default function Navbar(){
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observerTargets = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter(Boolean)

    if ('IntersectionObserver' in window){
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      }, { root: null, threshold: 0.6 })
      observerTargets.forEach(t => io.observe(t))
      return () => io.disconnect()
    }
  }, [])

  const onNavClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center space-x-6">
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e)=>onNavClick(e, s.id)}
              className={`nav-link text-white hover:text-gray-300 transition-colors ${active === s.id ? 'nav-active' : ''}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
