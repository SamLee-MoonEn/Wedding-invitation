import React, { useEffect, useState } from 'react'
import { NAMES } from '../config/names.js'

function AccountItem({ label, account, name }) {
  const handleCopy = async () => {
    const text = `${account}`.trim()
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      alert('복사되었습니다. 📋')
    } catch (e) {
      alert('복사에 실패했습니다.')
    }
  }
  return (
    <div className="pb-2 border-b border-gray-200">
      <div>
        <div className="flex items-center">
          <span className="text-xl font-normal text-gray-700 mr-2">{label}</span>
          <span className="text-xl font-semibold mr-2">{name}</span>
        </div>
        <div className="flex items-center mt-2">
        <span className="text-lg font-normal">{account}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button onClick={handleCopy} className="border border-modern-black text-modern-black px-3 py-1 rounded hover:bg-modern-black hover:text-white transition-colors">복사</button>
      </div>
    </div>
  )
}

function AccountsModal({ side, title, items, onClose }){
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={(e)=>{ if(e.target===e.currentTarget) onClose() }}>
      <div className="bg-white w-[min(92vw,640px)] max-h-[80vh] overflow-auto rounded-2xl p-6 relative shadow-xl">
        <button aria-label="닫기" className="absolute top-3 right-4 text-2xl" onClick={onClose}>×</button>
        <h3 className="font-display text-xl text-center text-modern-black mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map((it, idx) => (
            <AccountItem key={`${side}-${idx}`} label={it.label} account={it.account} name={it.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Gifts() {
  const [openSide, setOpenSide] = useState(null) // 'groom' | 'bride' | null

  const groomAccounts = [
    { label: '신랑', account: 'OO은행 000-000-000000', name: NAMES.groom.self },
    { label: '신랑 부', account: 'OO은행 000-000-000000', name: NAMES.groom.father },
    { label: '신랑 모', account: 'OO은행 000-000-000000', name: NAMES.groom.mother },
  ]
  const brideAccounts = [
    { label: '신부', account: 'OO은행 000-000-000000', name: NAMES.bride.self },
    { label: '신부 부', account: 'OO은행 000-000-000000', name: NAMES.bride.father },
    { label: '신부 모', account: 'OO은행 000-000-000000', name: NAMES.bride.mother },
  ]

  return (
    <section id="account" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl text-center text-modern-black mb-12">Wedding Gifts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 text-left">
              <h3 className="font-display text-xl text-modern-black mb-4 text-center">신랑 측</h3>
              <div className="flex justify-center">
                <button onClick={()=>setOpenSide('groom')} className="border border-modern-black text-modern-black w-full px-4 py-2 rounded-lg hover:bg-modern-black hover:text-white transition-colors">마음 보내실 곳</button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200 text-left">
              <h3 className="font-display text-xl text-modern-black mb-4 text-center">신부 측</h3>
              <div className="flex justify-center">
                <button onClick={()=>setOpenSide('bride')} className="border border-modern-black text-modern-black w-full px-4 py-2 rounded-lg hover:bg-modern-black hover:text-white transition-colors">마음 보내실 곳</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openSide === 'groom' && (
        <AccountsModal side="groom" title="신랑 측 계좌" items={groomAccounts} onClose={()=>setOpenSide(null)} />
      )}
      {openSide === 'bride' && (
        <AccountsModal side="bride" title="신부 측 계좌" items={brideAccounts} onClose={()=>setOpenSide(null)} />
      )}
    </section>
  )
}


