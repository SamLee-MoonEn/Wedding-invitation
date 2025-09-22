import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { firebaseConfig, validateMessage, COLLECTIONS } from '../../firebase-config.js'

export default function Guestbook(){
  const [db, setDb] = useState(null)
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    try{
      const app = initializeApp(firebaseConfig)
      const firestore = getFirestore(app)
      setDb(firestore)
      const q = query(collection(firestore, COLLECTIONS.GUESTBOOK), orderBy('createdAt', 'desc'))
      return onSnapshot(q, (snapshot) => {
        const list = []
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }))
        setMessages(list)
      })
    }catch(e){
      console.error('Firebase 초기화 실패', e)
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const v = validateMessage(name, message)
    if(!v.isValid){ alert(v.errors[0]); return }
    try{
      setSubmitting(true)
      if(db){
        await addDoc(collection(db, COLLECTIONS.GUESTBOOK), { name, message, password: password || null, createdAt: serverTimestamp(), timestamp: Date.now() })
        alert('축하 메시지가 등록되었어요! ✍️')
      }else{
        const local = JSON.parse(localStorage.getItem('weddingMessages') || '[]')
        local.push({ name, message, date: new Date().toLocaleDateString('ko-KR') })
        localStorage.setItem('weddingMessages', JSON.stringify(local))
        alert('메시지가 임시 저장되었습니다. (Firebase 연결 필요)')
        setMessages(local.map((m, idx) => ({ id: `local-${idx}`, ...m })))
      }
      setName(''); setPassword(''); setMessage('')
    }catch(err){
      alert('메시지 등록 중 오류가 발생했습니다.')
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <section id="guestbook" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-3xl text-center text-modern-black mb-12" data-aos="fade-up">Guest Book</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8" data-aos="fade-up">
          <form onSubmit={submit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password (Optional)</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-gray-400 focus:border-transparent" maxLength={200} required placeholder="Leave your congratulations message..."></textarea>
              <div className="text-right text-sm text-gray-500 mt-1">{message.length}/200</div>
            </div>
            <button disabled={submitting} type="submit" className="w-full bg-modern-black text-white py-3 rounded-lg hover:bg-modern-gray transition-colors">
              {submitting ? '등록 중...' : '✍️ Leave Message'}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>첫 번째 축하 메시지를 남겨주세요! 💌</p>
            </div>
          ) : messages.map(m => (
            <div key={m.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-black">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-modern-black">{m.name}</span>
                <span className="text-sm text-gray-500">{m.createdAt?.toDate ? m.createdAt.toDate().toLocaleString('ko-KR') : (m.date || '')}</span>
              </div>
              <div className="text-gray-700">{m.message}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


