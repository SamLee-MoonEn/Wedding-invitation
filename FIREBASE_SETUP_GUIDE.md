# 🔥 Firebase 방명록 설정 가이드

실제 데이터베이스를 사용하는 방명록 기능을 위한 Firebase 설정 방법입니다.

## 📋 **1단계: Firebase 프로젝트 생성**

### 1.1 Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. Google 계정으로 로그인

### 1.2 프로젝트 생성
1. **"프로젝트 추가"** 버튼 클릭
2. **프로젝트 이름** 입력 (예: `wedding-invitation-2025`)
3. **계속** 클릭
4. **Google 애널리틱스 사용 설정** (선택사항 - 스킵 가능)
5. **프로젝트 만들기** 클릭
6. 프로젝트 생성 완료까지 대기

## 📋 **2단계: Firestore 데이터베이스 설정**

### 2.1 Firestore 활성화
1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭

### 2.2 보안 규칙 설정
1. **"테스트 모드에서 시작"** 선택 (30일 후 자동으로 비활성화)
2. **다음** 클릭

### 2.3 Cloud Firestore 위치 선택
1. **"asia-northeast1 (Tokyo)"** 선택 (한국과 가장 가까움)
2. **완료** 클릭
3. 데이터베이스 생성 완료까지 대기

## 📋 **3단계: 웹 앱 설정**

### 3.1 웹 앱 추가
1. 프로젝트 개요 페이지에서 **웹 아이콘(</>)** 클릭
2. **앱 닉네임** 입력 (예: `wedding-invitation-web`)
3. **"Firebase 호스팅 설정"** 체크 (선택사항)
4. **"앱 등록"** 클릭

### 3.2 Firebase SDK 구성 정보 복사
**중요!** 다음 화면에서 나오는 설정 정보를 복사해두세요:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

## 📋 **4단계: 코드 설정**

### 4.1 Firebase 설정 업데이트
`demo.html` 파일의 Firebase 설정 부분을 찾아서 수정하세요:

```javascript
// ⚠️ 이 부분을 3단계에서 복사한 설정으로 교체하세요!
const firebaseConfig = {
  apiKey: "your-api-key-here",           // 👈 실제 API 키로 교체
  authDomain: "your-project.firebaseapp.com",  // 👈 실제 도메인으로 교체
  projectId: "your-project-id",          // 👈 실제 프로젝트 ID로 교체
  storageBucket: "your-project.appspot.com",   // 👈 실제 저장소로 교체
  messagingSenderId: "123456789",       // 👈 실제 ID로 교체
  appId: "your-app-id"                  // 👈 실제 앱 ID로 교체
};
```

### 4.2 설정 완료 확인
1. 웹사이트를 열어보세요 (`demo.html`)
2. 방명록 섹션에서 **"✅ Firebase 연결됨"** 메시지 확인
3. 테스트 메시지를 작성해보세요!

## 📋 **5단계: 보안 규칙 업데이트 (권장)**

### 5.1 Firestore 규칙 개선
테스트 모드는 30일 후 자동으로 비활성화되므로, 보안 규칙을 개선하세요:

1. Firebase Console → **Firestore Database** → **규칙** 탭
2. 다음 규칙으로 교체:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 방명록 컬렉션
    match /guestbook/{document} {
      // 누구나 읽기 가능
      allow read: if true;
      
      // 누구나 쓰기 가능하지만 유효성 검사
      allow create: if isValidMessage(resource.data);
      
      // 업데이트/삭제는 제한
      allow update, delete: if false;
    }
  }
}

// 메시지 유효성 검사 함수
function isValidMessage(data) {
  return data.keys().hasAll(['name', 'message', 'createdAt']) &&
         data.name is string &&
         data.message is string &&
         data.name.size() > 0 &&
         data.name.size() <= 50 &&
         data.message.size() > 0 &&
         data.message.size() <= 200;
}
```

3. **게시** 클릭

## 🎯 **6단계: 테스트**

### 6.1 기능 테스트
1. 웹사이트에서 방명록 작성 테스트
2. Firebase Console → **Firestore Database** → **데이터** 탭에서 저장된 메시지 확인
3. 다른 브라우저나 기기에서 실시간 업데이트 확인

### 6.2 문제 해결
**연결 실패시 확인사항:**
- Firebase 설정 정보가 정확한지 확인
- 프로젝트 ID가 올바른지 확인
- 브라우저 개발자 도구(F12) → Console에서 오류 메시지 확인

## 💰 **비용 정보**

### Firebase 무료 할당량 (Spark 요금제)
- **읽기**: 50,000회/일
- **쓰기**: 20,000회/일
- **삭제**: 20,000회/일
- **저장용량**: 1GB

웨딩 청첩장 방명록 용도로는 **무료 할당량으로 충분**합니다!

## 🚀 **추가 기능 (선택사항)**

### 호스팅 설정
Firebase Hosting을 사용하여 웹사이트를 배포할 수 있습니다:

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 프로젝트 초기화
firebase init hosting

# 배포
firebase deploy
```

### 실시간 알림
관리자가 새로운 방명록 메시지를 실시간으로 받고 싶다면:
1. Firebase Cloud Functions 설정
2. 이메일 또는 SMS 알림 구현

## ❓ **문제 해결**

### 자주 발생하는 오류

**1. "Firebase: No Firebase App '[DEFAULT]' has been created"**
- Firebase 설정 정보가 잘못되었을 가능성
- apiKey, projectId 등이 정확한지 확인

**2. "Missing or insufficient permissions"**
- Firestore 보안 규칙 문제
- 테스트 모드로 설정되어 있는지 확인

**3. "네트워크 연결 오류"**
- 인터넷 연결 확인
- 방화벽 설정 확인

### 도움 받기
- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firebase 커뮤니티](https://firebase.google.com/community)

---

🎉 **축하합니다!** 이제 실제 데이터베이스를 사용하는 방명록이 완성되었습니다! 