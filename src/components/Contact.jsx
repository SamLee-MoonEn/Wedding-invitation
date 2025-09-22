import React from 'react'
import { NAMES } from '../config/names.js'
import { PHONES } from '../config/phones.js'

function ActionButtons({ who, phone }){
  const call = () => {
    const clean = phone.replace(/[^0-9]/g, '')
    if (confirm(`${who}에게 전화를 걸까요?\n${phone}`)) window.open(`tel:${clean}`, '_self')
  }
  const sms = () => {
    const clean = phone.replace(/[^0-9]/g, '')
    if (confirm(`${who}에게 문자 메시지를 보내시겠습니까?\n${phone}`)) {
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(`sms:${clean}`, '_self')
      } else {
        navigator.clipboard.writeText(phone).then(()=>alert(`${who}의 전화번호가 복사되었습니다: ${phone}`))
      }
    }
  }
  return (
    <div className="flex justify-center space-x-3 sm:space-x-4">
      <button onClick={call} className="bg-modern-black text-white p-2 sm:p-3 rounded-full hover:bg-modern-gray transition-colors">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      </button>
      <button onClick={sms} className="bg-gray-600 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition-colors">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
      </button>
    </div>
  )
}

export default function Contact(){
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl text-center text-modern-black mb-12" data-aos="fade-up">Contact Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-lg sm:text-xl text-modern-black mb-2">신랑</h3>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700">{NAMES.groom.self}</p>
              <ActionButtons who="신랑" phone={PHONES.groom.self} />
            </div>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-lg sm:text-xl text-modern-black mb-2">신부</h3>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700">{NAMES.bride.self}</p>
              <ActionButtons who="신부" phone={PHONES.bride.self} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-lg sm:text-xl text-modern-black mb-4">신랑 측 혼주</h3>
              <div className="mb-4">
                <p className="text-sm sm:text-base text-gray-600 mb-1">아버지</p>
                <p className="text-base sm:text-lg text-gray-700 mb-3">{NAMES.groom.father}</p>
                <ActionButtons who="신랑 아버지" phone={PHONES.groom.father} />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 mb-1">어머니</p>
                <p className="text-base sm:text-lg text-gray-700 mb-3">{NAMES.groom.mother}</p>
                <ActionButtons who="신랑 어머니" phone={PHONES.groom.mother} />
              </div>
            </div>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-lg sm:text-xl text-modern-black mb-4">신부 측 혼주</h3>
              <div className="mb-4">
                <p className="text-sm sm:text-base text-gray-600 mb-1">아버지</p>
                <p className="text-base sm:text-lg text-gray-700 mb-3">{NAMES.bride.father}</p>
                <ActionButtons who="신부 아버지" phone={PHONES.bride.father} />
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 mb-1">어머니</p>
                <p className="text-base sm:text-lg text-gray-700 mb-3">{NAMES.bride.mother}</p>
                <ActionButtons who="신부 어머니" phone={PHONES.bride.mother} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


