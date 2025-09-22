import React, { useEffect } from 'react'
import Home from './components/Home.jsx'
import Invitation from './components/Invitation.jsx'
import Gallery from './components/Gallery.jsx'
import Gifts from './components/Gifts.jsx'
import Contact from './components/Contact.jsx'
import Info from './components/Info.jsx'
import Guestbook from './components/Guestbook.jsx'
import ShareFooter from './components/ShareFooter.jsx'
import Navbar from './components/Navbar.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function App(){
  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 100 })
  }, [])
  return (
    <>
      <Navbar />
      <Home />
      <Invitation />
      <Gallery />
      <Contact />
      <Gifts />
      <Info />
      <Guestbook />
      <ShareFooter />
    </>
  )
}


