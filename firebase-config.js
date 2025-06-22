// Firebase 설정 파일
// Firebase Console에서 프로젝트 설정 → 일반 → SDK 설정 및 구성에서 복사하세요

export const firebaseConfig = {
  // ⚠️ 아래 값들을 실제 Firebase 프로젝트 설정으로 교체하세요!
  apiKey: "AIzaSyCl_RXyB3l56Z7OQJkUtjA8RcDTa39PFIE",
  authDomain: "guestbook-291b2.firebaseapp.com",
  projectId: "guestbook-291b2",
  storageBucket: "guestbook-291b2.firebasestorage.app",
  messagingSenderId: "918531874015",
  appId: "1:918531874015:web:e63bc0e32972641ecbdd6a",
  measurementId: "G-H30VBFVDFY"
};

// Firestore 컬렉션 이름
export const COLLECTIONS = {
  GUESTBOOK: 'guestbook',
  RSVP: 'rsvp'
};

// 방명록 메시지 검증 함수
export function validateMessage(name, message) {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('이름을 입력해주세요.');
  }
  
  if (name && name.length > 50) {
    errors.push('이름은 50자 이내로 입력해주세요.');
  }
  
  if (!message || message.trim().length === 0) {
    errors.push('메시지를 입력해주세요.');
  }
  
  if (message && message.length > 200) {
    errors.push('메시지는 200자 이내로 입력해주세요.');
  }
  
  // 간단한 비속어 필터
  const badWords = ['욕설1', '욕설2', '비속어']; // 실제 사용시 더 많은 단어 추가
  const hasBadWords = badWords.some(word => 
    message.toLowerCase().includes(word.toLowerCase())
  );
  
  if (hasBadWords) {
    errors.push('부적절한 내용이 포함되어 있습니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 