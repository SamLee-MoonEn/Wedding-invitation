import React from 'react'

export default function ShareFooter(){
  const shareKakao = () => alert('카카오톡 공유 기능을 준비 중입니다.')
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); alert('링크가 복사되었습니다! 📋') }
    catch { alert('복사에 실패했습니다.') }
  }
  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-md text-center">
          <h2 className="font-display text-2xl text-modern-black mb-8" data-aos="fade-up">Share Invitation</h2>
          <div className="space-y-4" data-aos="fade-up">
            <button onClick={shareKakao} className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">💬 Share via KakaoTalk</button>
            <button onClick={copyLink} className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">📋 링크 복사</button>
          </div>
        </div>
      </section>
      <footer className="py-8 px-4 bg-modern-black text-white text-center">
        <p className="font-display">Thank you for celebrating with us! 🖤</p>
      </footer>
    </>
  )
}
