// Import styles
import './style.css';

// Import libraries
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize AOS
AOS.init({
  duration: 600,
  once: true,
  offset: 100
});

// Initialize Swiper
const swiper = new Swiper('.gallery-swiper', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Utility Functions
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} shadow-lg mb-2`;
  toast.innerHTML = `
    <div>
      <span>${message}</span>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// F-02: Calendar functionality
document.getElementById('add-to-calendar')?.addEventListener('click', () => {
  const event = {
    title: '결혼식 - 신랑 & 신부',
    start: '2025-07-01T15:00:00',
    end: '2025-07-01T17:00:00',
    description: '저희의 결혼식에 참석해 주세요.',
    location: '웨딩홀, 서울특별시 강남구'
  };
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//Event//KO
BEGIN:VEVENT
DTSTART:20250701T060000Z
DTEND:20250701T080000Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
  
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'wedding-invitation.ics';
  link.click();
  URL.revokeObjectURL(url);
  
  showToast('캘린더 파일이 다운로드되었습니다! 📅');
});

// Map functionality
window.openMap = function(mapType) {
  const address = '서울특별시 강남구';
  const encodedAddress = encodeURIComponent(address);
  
  let url;
  switch(mapType) {
    case 'naver':
      url = `https://map.naver.com/v5/search/${encodedAddress}`;
      break;
    case 'kakao':
      url = `https://map.kakao.com/link/search/${encodedAddress}`;
      break;
    case 'google':
      url = `https://maps.google.com/maps?q=${encodedAddress}`;
      break;
  }
  
  window.open(url, '_blank');
};

// F-04: Account copy functionality
window.copyAccount = async function(type) {
  const accounts = {
    groom: '123-456-789012',
    bride: '987-654-321098'
  };
  
  try {
    await navigator.clipboard.writeText(accounts[type]);
    showToast('계좌번호가 복사되었습니다! 📋');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = accounts[type];
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('계좌번호가 복사되었습니다! 📋');
  }
};

// F-07: Guestbook functionality
let messagesUnsubscribe = null;

function loadGuestbookMessages() {
  const messagesContainer = document.getElementById('messages-container');
  
  if (messagesUnsubscribe) {
    messagesUnsubscribe();
  }
  
  const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
  
  messagesUnsubscribe = onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    
    if (snapshot.empty) {
      messagesContainer.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <p>첫 번째 축하 메시지를 남겨주세요! 💌</p>
        </div>
      `;
      return;
    }
    
    snapshot.forEach((doc) => {
      const message = doc.data();
      const messageElement = document.createElement('div');
      messageElement.className = 'message-card';
      messageElement.innerHTML = `
        <div class="message-header">
          <span class="message-author">${message.name}</span>
          <span class="message-date">${formatDate(message.createdAt)}</span>
        </div>
        <div class="message-content">${message.message}</div>
      `;
      messagesContainer.appendChild(messageElement);
    });
  }, (error) => {
    console.error('Error loading messages:', error);
    showToast('메시지를 불러오는 중 오류가 발생했습니다.', 'error');
  });
}

// Message character counter
const messageTextarea = document.getElementById('guest-message');
const messageCounter = document.getElementById('message-count');

messageTextarea?.addEventListener('input', (e) => {
  const count = e.target.value.length;
  messageCounter.textContent = count;
  
  if (count > 200) {
    messageCounter.classList.add('text-red-500');
  } else {
    messageCounter.classList.remove('text-red-500');
  }
});

// Guestbook form submission
document.getElementById('guestbook-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nameInput = document.getElementById('guest-name');
  const passwordInput = document.getElementById('guest-password');
  const messageInput = document.getElementById('guest-message');
  
  const name = nameInput.value.trim();
  const password = passwordInput.value;
  const message = messageInput.value.trim();
  
  if (!name || !message) {
    showToast('이름과 메시지를 모두 입력해주세요.', 'error');
    return;
  }
  
  if (message.length > 200) {
    showToast('메시지는 200자 이내로 작성해주세요.', 'error');
    return;
  }
  
  // Simple profanity filter (replace with actual bad-words-ko if needed)
  const badWords = ['욕설1', '욕설2']; // Add actual bad words
  const hasBadWords = badWords.some(word => 
    message.toLowerCase().includes(word.toLowerCase())
  );
  
  if (hasBadWords) {
    showToast('부적절한 내용이 포함되어 있습니다.', 'error');
    return;
  }
  
  try {
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> 등록 중...';
    
    await addDoc(collection(db, 'guestbook'), {
      name,
      message,
      password: password || null,
      createdAt: serverTimestamp(),
      ip: null // You might want to track IP for moderation
    });
    
    // Reset form
    nameInput.value = '';
    passwordInput.value = '';
    messageInput.value = '';
    messageCounter.textContent = '0';
    
    showToast('축하 메시지가 등록되었어요! 💐');
    
  } catch (error) {
    console.error('Error adding message:', error);
    showToast('메시지 등록 중 오류가 발생했습니다.', 'error');
  } finally {
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.innerHTML = '💐 축하 메시지 남기기';
  }
});

// F-05: Share functionality
document.getElementById('share-kakao')?.addEventListener('click', () => {
  // Kakao SDK would be loaded separately
  if (typeof Kakao !== 'undefined') {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '우리의 모바일 청첩장',
        description: '저희의 결혼식에 여러분을 초대합니다.',
        imageUrl: window.location.origin + '/assets/wedding-cover.svg',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  } else {
    showToast('카카오톡 공유 기능을 준비 중입니다.', 'error');
  }
});

document.getElementById('share-native')?.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '우리의 모바일 청첩장',
        text: '저희의 결혼식에 여러분을 초대합니다.',
        url: window.location.href,
      });
    } catch (error) {
      console.log('Share cancelled');
    }
  } else {
    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('링크가 복사되었습니다! 📋');
    } catch (error) {
      showToast('공유 기능을 사용할 수 없습니다.', 'error');
    }
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize guestbook on page load
document.addEventListener('DOMContentLoaded', () => {
  loadGuestbookMessages();
});

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
} 