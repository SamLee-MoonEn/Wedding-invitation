import React, { useEffect } from 'react'
import { COUPLE } from '../config/names.js'

export default function Home(){
  useEffect(() => {
    const fillText = document.querySelector('.svg-title text.fill')
    const subtitle = document.getElementById('subtitle-block')
    if (!fillText || !subtitle) return
    const handler = () => subtitle.classList.add('subtitle-show')
    fillText.addEventListener('animationend', handler, { once: true })
    return () => fillText.removeEventListener('animationend', handler)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-start justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="assets/cover.jpg" alt="Wedding Cover Photo" className="w-full h-full object-cover translate-y-6 md:translate-y-20" onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='block' }} />
        <div className="w-full h-full bg-gradient-to-b from-gray-400 to-gray-600 hidden"></div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center px-4 pt-16">
        <div className="svg-title-wrap mb-8">
          <svg className="svg-title" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet" aria-label="Our Happy Wedding">
            <defs>
              <linearGradient id="ink" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--title-color)"/>
                <stop offset="100%" stopColor="var(--title-color)"/>
              </linearGradient>
              <filter id="whiteShadow" x="-30%" y="-30%" width="150%" height="150%">
                <feDropShadow dx="0" dy="0" stdDeviation="0.9" floodColor="#ffffff" floodOpacity="0.35"/>
              </filter>
            </defs>
            <text className="draw" x="50%" y="55%" textAnchor="middle" dominantBaseline="middle">Our Happy Wedding</text>
            <text className="fill" x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" filter="url(#whiteShadow)">Our Happy Wedding</text>
          </svg>
        </div>
        <div id="subtitle-block" className="space-y-4 text-white hero-text subtitle-hidden">
          <div className="w-24 h-px bg-white mx-auto my-6"></div>
          <p className="font-display text-2xl md:text-3xl tracking-wider font-semibold">{COUPLE.groom} & {COUPLE.bride}</p>
          <p className="text-lg md:text-xl font-light tracking-widest">2025.12.14 03:00 PM</p>
        </div>
      </div>
    </section>
  )
}


