# 우리의 모바일 청첩장 📱💕

모바일에 최적화된 아름다운 웨딩 청첩장입니다. 사랑스러운 디자인과 실용적인 기능으로 여러분의 특별한 날을 더욱 의미있게 만들어드립니다.

## ✨ 주요 기능

### 📋 필수 기능
- **F-01** 환영 인사 및 커버 섹션 - 웨딩 사진과 함께하는 따뜻한 인사
- **F-02** 예식 정보 - 날짜, 시간, 장소 정보 및 지도 링크, 캘린더 저장
- **F-03** 사진·영상 갤러리 - Swiper.js 기반 터치 친화적 갤러리
- **F-04** 마음 전하실 곳 - 계좌번호 안내 및 원터치 복사
- **F-05** SNS 공유 - 카카오톡 링크 공유 및 네이티브 공유 API
- **F-07** 방명록 - 실시간 축하 메시지 작성 및 확인

### 📱 기술적 특징
- **모바일 퍼스트** 반응형 디자인
- **PWA 지원** - 앱처럼 설치 가능
- **실시간 데이터** - Firebase Firestore 기반
- **빠른 로딩** - 1초 이내 초기 로드
- **접근성** - WCAG 2.1 AA 준수

## 🛠 기술 스택

### Frontend
- **Vite** - 빌드 도구
- **Tailwind CSS v3** - 유틸리티 퍼스트 CSS 프레임워크
- **DaisyUI** - Tailwind 기반 컴포넌트 라이브러리
- **AOS.js** - 스크롤 애니메이션
- **Swiper.js** - 터치 슬라이더

### Backend & Infrastructure
- **Firebase Hosting** - 정적 호스팅
- **Firebase Firestore** - NoSQL 데이터베이스
- **Firebase Auth** - 사용자 인증 (선택적)

### Design
- **Google Fonts** - Noto Serif KR, Playfair Display
- **Phosphor Icons** - 아이콘 시스템
- **커스텀 웨딩 테마** - 골드, 아이보리, 로지 핑크 색상 팔레트

## 🚀 시작하기

### 필수 요구사항
- Node.js (v16 이상)
- npm 또는 yarn
- Firebase 프로젝트

### 설치

1. **저장소 클론**
```bash
git clone https://github.com/your-username/mobile-wedding-invitation.git
cd mobile-wedding-invitation
```

2. **의존성 설치**
```bash
npm install
```

3. **Firebase 설정**
```bash
# Firebase CLI 설치 (글로벌)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 프로젝트 초기화
firebase init
```

4. **환경 설정**
   - `src/main.js`에서 Firebase 설정 정보를 실제 값으로 교체
   - Firestore 데이터베이스 생성
   - Firestore 규칙 및 인덱스 배포

5. **개발 서버 실행**
```bash
npm run dev
```

## 🔧 설정

### Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore 데이터베이스 활성화
3. 호스팅 설정
4. `src/main.js`의 firebaseConfig 객체를 실제 설정으로 업데이트

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",  
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 콘텐츠 커스터마이징
1. **사진 교체**: `public/assets/` 폴더의 이미지들을 원하는 웨딩 사진으로 교체
2. **텍스트 수정**: `index.html`에서 신랑신부 이름, 날짜, 장소 정보 수정
3. **계좌번호**: `src/main.js`의 계좌 정보 업데이트
4. **색상 테마**: `tailwind.config.js`에서 웨딩 컬러 팔레트 조정

## 📦 배포

### Firebase 호스팅
```bash
# 빌드
npm run build

# Firebase 배포
firebase deploy
```

### 기타 호스팅 플랫폼
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: GitHub Actions 워크플로우 사용

## 🎨 디자인 가이드

### 색상 팔레트
- **Primary**: `#c6a27e` (웨딩 골드)
- **Secondary**: `#fff7f0` (아이보리)
- **Accent**: `#eec6d6` (로지 핑크)

### 타이포그래피
- **헤드라인**: Playfair Display (우아한 세리프)
- **본문**: Noto Serif KR (한글 세리프)

### 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 📱 PWA 기능

이 웨딩 청첩장은 PWA(Progressive Web App)로 제작되어 다음 기능을 제공합니다:

- 📲 **홈 화면에 추가** - 앱처럼 설치 가능
- ⚡ **빠른 로딩** - 서비스 워커로 캐싱
- 📱 **반응형** - 모든 기기에서 완벽한 표시
- 🔄 **오프라인 지원** - 네트워크 없이도 기본 콘텐츠 확인

## 🔒 보안

- HTTPS 필수
- Firestore 보안 규칙 적용
- CSP(Content Security Policy) 헤더
- XSS 및 CSRF 보호

## 🧪 테스트

```bash
# 개발 서버에서 테스트
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm run preview
```

### Lighthouse 성능 최적화
- 성능: 90+ 목표
- 접근성: 90+ 목표
- 베스트 프랙티스: 90+ 목표
- SEO: 90+ 목표

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

💕 **사랑스러운 결혼식을 축하합니다!** 💕

이 템플릿이 여러분의 특별한 날을 더욱 아름답게 만들어드리길 바랍니다. 