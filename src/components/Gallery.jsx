import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  { src: '/Wedding-invitation/assets/gallery01.jpg', alt: 'Wedding Photo 1', title: 'Photo 01', emoji: '📸' },
  { src: '/Wedding-invitation/assets/gallery02.jpg', alt: 'Wedding Photo 2', title: 'Photo 02', emoji: '🖤' },
  { src: '/Wedding-invitation/assets/gallery03.jpg', alt: 'Wedding Photo 3', title: 'Photo 03', emoji: '🤍' },
  { src: '/Wedding-invitation/assets/gallery04.jpg', alt: 'Wedding Photo 4', title: 'Photo 04', emoji: '💫' },
  { src: '/Wedding-invitation/assets/gallery05.jpg', alt: 'Wedding Photo 5', title: 'Photo 05', emoji: '✨' },
  { src: '/Wedding-invitation/assets/gallery06.jpg', alt: 'Wedding Photo 6', title: 'Photo 06', emoji: '🌟' },
  { src: '/Wedding-invitation/assets/gallery07.jpg', alt: 'Wedding Photo 7', title: 'Photo 07', emoji: '⭐' },
  { src: '/Wedding-invitation/assets/gallery08.jpg', alt: 'Wedding Photo 8', title: 'Photo 08', emoji: '💎' },
]

export default function Gallery(){
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    function onEsc(e){ if(e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  const prev = () => setCurrent((current - 1 + images.length) % images.length)
  const next = () => setCurrent((current + 1) % images.length)

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl text-center text-modern-black mb-12" data-aos="fade-up">Photo Gallery</h2>

        <div data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={800}
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2.5, spaceBetween: 40 },
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="gallery-item aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={()=>{ setCurrent(i); setOpen(true) }}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; (e.currentTarget.nextElementSibling).style.display='flex' }} />
                  <div className="w-full h-full hidden items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{img.emoji}</div>
                      <div className="text-modern-gray text-lg">{img.title}</div>
                      <div className="text-gray-500 text-sm mt-1">Click to view</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={(e)=>{ if(e.target===e.currentTarget) setOpen(false) }}>
          <button className="absolute top-4 right-5 text-white text-3xl" onClick={()=>setOpen(false)}>×</button>
          <button className="gallery-nav prev absolute left-4 text-white text-4xl" onClick={prev}>‹</button>
          <button className="gallery-nav next absolute right-4 text-white text-4xl" onClick={next}>›</button>
          <div className="w-full max-w-3xl h-96 bg-gray-200 flex items-center justify-center">
            <img src={images[current].src} alt={images[current].alt} className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}


