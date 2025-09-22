import React from 'react'

export default function Invitation(){
  return (
    <section id="invitation" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-center text-modern-black text-2xl tracking-widest uppercase mb-8" data-aos="fade-up">invitation</h2>
        <div className="space-y-4 text-center text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          <p><span className="editable-first text-2xl" aria-label="첫 글자">상</span>반기 보고 대신 청첩장을 전합니다.</p>
          <p><span className="editable-first text-2xl" aria-label="첫 글자">호</span>칭은 오늘부터 신랑·신부로 바뀝니다.</p>
          <p><span className="editable-first text-2xl" aria-label="첫 글자">승</span>진보다 서로의 성장을 먼저 응원하며,</p>
          <p><span className="editable-first text-2xl" aria-label="첫 글자">하</span>루의 일정표에 사랑을 가장 먼저 적겠습니다.</p>
        </div>
      </div>
    </section>
  )
}


