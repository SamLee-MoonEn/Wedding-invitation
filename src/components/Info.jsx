import React from 'react'

export default function Info(){
  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20251214T060000Z\nDTEND:20251214T080000Z\nSUMMARY:결혼식 - 신랑 & 신부\nDESCRIPTION:저희의 결혼식에 참석해 주세요.\nLOCATION:고려스퀘어 웨딩홀\nEND:VEVENT\nEND:VCALENDAR`
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
    alert('캘린더 파일이 다운로드되었습니다! 📅')
  }
  const openMap = (type) => {
    const address = '고려대 교우회관 웨딩홀'
    const urls = {
      naver: `https://map.naver.com/v5/search/${encodeURIComponent(address)}`,
      kakao: `https://map.kakao.com/link/search/${encodeURIComponent(address)}`,
      google: `https://maps.google.com/maps?q=${encodeURIComponent(address)}`
    }
    window.open(urls[type], '_blank')
  }
  return (
    <section id="info" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl text-center text-modern-black mb-12" data-aos="fade-up">Wedding Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center" data-aos="fade-up">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-xl text-modern-black mb-4">DATE & TIME</h3>
              <p className="text-lg mb-2 text-gray-700">2025년 12월 14일 일요일</p>
              <p className="text-lg mb-4 text-gray-700">오후 3시</p>
              <button onClick={downloadCalendar} className="bg-modern-black text-white px-6 py-2 rounded-lg hover:bg-modern-gray transition-colors">📅 Save to Calendar</button>
            </div>
          </div>
          <div className="text-center" data-aos="fade-up">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-display text-xl text-modern-black mb-4">LOCATION</h3>
              <p className="text-gray-600 mb-4">고려스퀘어 웨딩홀(웨드유)</p>
              <div className="space-y-2">
                <button onClick={()=>openMap('naver')} className="block w-full border border-modern-black text-modern-black px-4 py-2 rounded-lg hover:bg-modern-black hover:text-white transition-colors">네이버 지도</button>
                <button onClick={()=>openMap('kakao')} className="block w-full border border-modern-black text-modern-black px-4 py-2 rounded-lg hover:bg-modern-black hover:text-white transition-colors">카카오 지도</button>
                <button onClick={()=>openMap('google')} className="block w-full border border-modern-black text-modern-black px-4 py-2 rounded-lg hover:bg-modern-black hover:text-white transition-colors">구글 지도</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
