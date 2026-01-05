# 💍 모바일 청첩장

React나 프레임워크 없이 순수 HTML, CSS, JavaScript로 만든 모바일 청첩장입니다.

## ✨ 주요 기능

- 📱 **반응형 디자인**: 모바일, 태블릿, PC 모두 지원
- ⏰ **D-Day 카운터**: 자동으로 결혼식까지 남은 날짜 계산
- 📞 **연락하기**: 전화 걸기 버튼
- 🗺️ **오시는 길**: 카카오맵 연동 가능
- 💰 **계좌번호 복사**: 원클릭 복사 기능
- 💌 **방명록**: 축하 메시지 작성 (LocalStorage 사용)
- 📤 **공유하기**: 카카오톡, URL 복사
- 📸 **갤러리**: 사진 갤러리

## 🚀 빠른 시작

### 1. 정보 수정하기

#### `index.html` 수정
```html
<!-- 이름 변경 -->
<h1 class="names">홍길동 <span class="heart">♥</span> 김철수</h1>

<!-- 날짜 및 장소 변경 -->
<p class="date">2025년 12월 25일 (토) 오후 2시</p>
<p class="location">서울웨딩홀 3층 그랜드홀</p>
<p class="address">서울특별시 강남구 테헤란로 123</p>

<!-- 계좌번호 변경 -->
<p>신한은행 110-123-456789</p>
```

#### `script.js` 수정
```javascript
// 결혼식 날짜 설정 (YYYY, MM-1, DD)
const weddingDate = new Date(2025, 11, 25); // 2025년 12월 25일
```

### 2. 이미지 추가하기

1. `images` 폴더를 만듭니다
2. 사진들을 추가합니다:
   - `main.jpg` - 메인 사진
   - `gallery-1.jpg` ~ `gallery-6.jpg` - 갤러리 사진

3. HTML에서 이미지 경로를 수정합니다:
```html
<!-- 메인 이미지 -->
<div class="hero-image">
    <img src="images/main.jpg" alt="메인 사진">
</div>

<!-- 갤러리 -->
<div class="gallery-item">
    <img src="images/gallery-1.jpg" alt="갤러리 1">
</div>
```

### 3. 로컬에서 테스트

브라우저로 `index.html` 파일을 열면 바로 확인할 수 있습니다.

또는 간단한 웹서버 실행:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx 사용)
npx serve

# 브라우저에서 http://localhost:8000 접속
```

## 📦 GitHub Pages 배포

### 방법 1: GitHub Desktop 사용

1. GitHub Desktop에서 새 저장소 생성
2. 파일들을 모두 커밋
3. GitHub에 푸시
4. 저장소 Settings → Pages → main branch 선택
5. URL 확인: `https://username.github.io/wedding-invitation`

### 방법 2: 명령줄 사용

```bash
# Git 저장소 초기화
git init
git add .
git commit -m "Initial commit: Wedding invitation"

# GitHub 저장소 생성 후
git remote add origin https://github.com/username/wedding-invitation.git
git branch -M main
git push -u origin main

# GitHub Pages 활성화
# Settings → Pages → Source: main branch
```

## 🎨 커스터마이징

### 색상 변경

`style.css`에서 색상 변수 수정:
```css
:root {
    --primary-color: #d4a574;  /* 메인 색상 */
    --secondary-color: #f5f5f5; /* 배경 색상 */
    --text-color: #333;         /* 텍스트 색상 */
}
```

### 폰트 변경

`style.css`에서 폰트 변경:
```css
body {
    font-family: 'Noto Sans KR', sans-serif;
}
```

Google Fonts를 사용하려면 `index.html` `<head>`에 추가:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet">
```

## 🗺️ 카카오맵 연동 (선택사항)

### 1. 카카오 개발자 등록

1. [Kakao Developers](https://developers.kakao.com/) 가입
2. 내 애플리케이션 → 애플리케이션 추가
3. JavaScript 키 발급

### 2. HTML에 SDK 추가

```html
<!-- index.html <head>에 추가 -->
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY"></script>
```

### 3. script.js에서 지도 초기화

```javascript
// script.js 하단 주석 해제 및 좌표 수정
function initMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 실제 장소 좌표
        level: 3
    };
    // ... 나머지 코드
}
```

## 📱 카카오톡 공유 설정 (선택사항)

### 1. 카카오 개발자에서 플랫폼 등록

1. 내 애플리케이션 → 플랫폼 → Web 플랫폼 등록
2. 사이트 도메인 추가: `https://username.github.io`

### 2. HTML에 SDK 추가

```html
<!-- index.html <head>에 추가 -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
    Kakao.init('YOUR_JAVASCRIPT_KEY');
</script>
```

### 3. script.js에서 공유 정보 수정

```javascript
// shareKakao() 함수에서 정보 수정
content: {
    title: '홍길동 ♥ 김철수 결혼합니다',
    description: '2025년 12월 25일 (토) 오후 2시',
    imageUrl: 'https://username.github.io/wedding-invitation/images/main.jpg',
    // ...
}
```

## 🔧 방명록 서버 연동 (고급)

현재 방명록은 LocalStorage를 사용하여 브라우저에만 저장됩니다.
실제 서버에 저장하려면:

1. **Firebase 사용** (추천)
   - Firebase Realtime Database 또는 Firestore 사용
   - 무료로 시작 가능

2. **백엔드 API 개발**
   - Node.js + Express
   - Spring Boot
   - etc.

## 📁 프로젝트 구조

```
wedding-invitation/
├── index.html          # 메인 HTML
├── style.css          # 스타일시트
├── script.js          # JavaScript
├── README.md          # 설명서 (이 파일)
├── .gitignore         # Git 제외 파일
└── images/            # 이미지 폴더 (직접 생성)
    ├── main.jpg
    ├── gallery-1.jpg
    └── ...
```

## 💡 팁

### 이미지 최적화
- 이미지 크기를 줄이면 로딩 속도가 빨라집니다
- 추천 도구: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### 모바일 테스트
- Chrome 개발자 도구 → 모바일 화면 확인
- 실제 모바일 기기에서도 테스트

### 도메인 연결
- GitHub Pages에서 커스텀 도메인 설정 가능
- Settings → Pages → Custom domain

## 🐛 문제 해결

### D-Day가 안 나와요
- `script.js`에서 날짜 형식 확인
- 월은 0부터 시작 (1월 = 0, 12월 = 11)

### 이미지가 안 보여요
- 이미지 경로 확인 (`images/main.jpg`)
- 파일 이름 대소문자 확인

### GitHub Pages에서 안 열려요
- 저장소 Settings → Pages 확인
- main 브랜치 선택되었는지 확인
- 5-10분 기다리기

## 📞 문의

문제가 있거나 도움이 필요하면 GitHub Issues를 통해 문의해주세요.

---

**행복한 결혼을 축하합니다! 💐**
